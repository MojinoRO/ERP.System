import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import styles from "./TopBar.module.css";
import type {CargaDatosEmpresaResponse} from "../../Types/ConfEmpresa"
import { GetDatosEmpresa } from "../../Api/ConfEmpresaService";
import { Breadcrumb } from "../UI/Breadcrumb";
import { NotificationsDropdown } from "../UI/NotificationsDropdown";
import { UserMenu } from "../UI/UserMenu";
import { useTabs } from "../../Context/TabContext";

export default function TopBar() {
  const { activeId } = useTabs();
  const [datosEmpresa, setDatosEmpresa]=useState<CargaDatosEmpresaResponse>({
    EmpresaID: 0,
    EmpresaNit:"",
    EmpresaDv:"",
    EmpresaNombre:"",
    EmpresaRazonSocial:"",
    EmpresaRepresentanteLegal:"",
    EmpresaTelefono:"",
    EmpresaDireccion:"",
    EmpresaEmail:"",
    EmpresaKeyLicencia:""
  })

  const loadDatosEmpresa = async ()=>{
    try{
      const data = await GetDatosEmpresa();
      setDatosEmpresa(data)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    loadDatosEmpresa()
  },[])

  // Mapear página actual para breadcrumb
  const getBreadcrumbItems = () => {
    const pageNames: {[key: string]: string} = {
      'dashboard': 'Dashboard',
      'Inventarios': 'Inventarios',
      'Configuracion': 'Configuración',
      'ConfEmpresa': 'Datos Empresa',
      'ConfCiudades': 'Ciudades',
      'ConfVendedores': 'Digitadores',
      'ConfAlmacenes': 'Almacenes',
      'ConfCategorias': 'Categorías',
      'ConfSubCategorias': 'Subcategorías',
      'ConfMarcas': 'Marcas',
    };

    const currentPage = activeId && typeof activeId === 'string' ? pageNames[activeId] : 'Dashboard';
    return [
      { label: 'Home' },
      { label: currentPage || 'Dashboard' },
    ];
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.title}>Bienvenido 👋</span>
        <Breadcrumb items={getBreadcrumbItems()} />
      </div>

      <div className={styles.center}>
        <div className={styles.searchContainer}>
          <Search size={18} color="var(--color-text-tertiary)" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar en ERP..."
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.companyInfo}>
          <span className={styles.companyName}>{datosEmpresa.EmpresaNombre}</span>
        </div>

        <NotificationsDropdown />
        <UserMenu userName="Admin" userInitials="AD" />
      </div>
    </header>
  );
}

