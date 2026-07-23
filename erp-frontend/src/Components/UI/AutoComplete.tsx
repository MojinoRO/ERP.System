import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../Hook/UseDebounce";
import styles from "./AutoComplete.module.css";

interface AutoCompleteProps<T> {
  onSearch: (query: string) => Promise<T[]>;
  getLabel: (item: T) => string;
  getKey: (item: T) => number;
  onSelect: (item: T) => void;
  label?: string;
  placeHolder?: string;
  minChars?: number;
  debounceMs?: number;
  onClean?: () => void;
}

export function AutoComplete<T>(props: AutoCompleteProps<T>) {
  const {
    onSearch,
    getLabel,
    getKey,
    onSelect,
    label,
    placeHolder,
    minChars = 2,
    debounceMs = 400,
  } = props;

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const debouncedQuery = useDebounce(query, debounceMs);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  const searchIdRef = useRef(0);
  const skipNextSearchRef = useRef(false);
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (debouncedQuery.trim().length < minChars) {
      setResult([]);
      setIsOpen(false);
      return;
    }

    const currentSearchId = ++searchIdRef.current;

    setIsLoading(true);

    onSearchRef
      .current(debouncedQuery)
      .then((data) => {
        if (currentSearchId !== searchIdRef.current) return; // llego tarde ,descartar
        setResult(data);
        setIsOpen(true);
        setHighlightedIndex(-1);
      })
      .finally(() => {
        if (currentSearchId === searchIdRef.current) setIsLoading(false);
      });
  }, [debouncedQuery, minChars]);

  //si el usuario vuelve y escribe y ya habia algo seleccionado , aqui hacemos que vuelva al modo busqueda
  const handledInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (selectedItem) setSelectedItem(null);
  };

  const handledSelect = (item: T) => {
    setSelectedItem(item);
    skipNextSearchRef.current = true;
    setQuery(getLabel(item));
    setIsOpen(false);
    setResult([]);
    onSelect(item); //avisa al form padre
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || result.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, result.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handledSelect(result[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  return (
    <div className={styles.wrapper} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        value={query}
        onChange={handledInputChanged}
        onKeyDown={handleKeyDown}
        onFocus={() => result.length > 0 && setIsOpen(true)}
        placeholder={placeHolder}
      />
      {isLoading && <span className={styles.loading}>Buscando...</span>}
      {isOpen && result.length > 0 && (
        <ul className={styles.dropdown}>
          {result.map((item, i) => (
            <li
              key={getKey(item)}
              className={`${styles.option} ${i === highlightedIndex ? styles.highlighted : ""}`}
              onMouseDown={() => handledSelect(item)}
            >
              {getLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
