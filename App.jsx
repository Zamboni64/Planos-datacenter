import React, { useState } from 'react';
import { Info, ArrowDown, ArrowUp, Zap, Server, Wind, ShieldAlert, Ruler, Cable, DoorOpen } from 'lucide-react';

const Rack = ({ id, type, label, onClick }) => {
  const typeStyles = {
    server: 'bg-emerald-800 text-emerald-50 border-emerald-900',
    blade: 'bg-gray-800 text-gray-100 border-gray-900',
    san: 'bg-indigo-900 text-indigo-100 border-indigo-950',
    network: 'bg-sky-400 text-sky-950 border-sky-500',
    firewall: 'bg-red-400 text-red-950 border-red-500',
    patch: 'bg-fuchsia-400 text-fuchsia-950 border-fuchsia-500',
    crac: 'bg-cyan-300 text-cyan-950 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10',
  };

  const baseStyle = "flex flex-col items-center justify-center p-2 text-xs font-bold text-center border-2 rounded cursor-pointer transition-transform hover:scale-105 h-24 min-w-[60px] relative z-20";

  return (
    <div 
      className={`${baseStyle} ${typeStyles[type] || 'bg-gray-200'}`}
      onClick={() => onClick({id, type, label})}
      title={label}
    >
      {type === 'crac' ? <Wind className="mb-1" size={16} /> : <Server className="mb-1" size={16} />}
      <span className="leading-tight">{id}</span>
    </div>
  );
};

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showCables, setShowCables] = useState(false);

  const rows = {
    C: [
      { id: 'C01', type: 'server', label: 'C01 App Server' },
      { id: 'C02', type: 'server', label: 'C02 App Server' },
      { id: 'C03', type: 'blade', label: 'C03 DB Blade' },
      { id: 'CRAC-1', type: 'crac', label: 'Liebert CRV 20KW (Movido In-Row)' },
      { id: 'C04', type: 'blade', label: 'C04 DB Blade' },
      { id: 'C05', type: 'network', label: 'C05 Core Switch' },
      { id: 'C06', type: 'firewall', label: 'C06 Firewall Principal' },
      { id: 'C07', type: 'patch', label: 'C07 ODF Fibra' },
    ],
    B: [
      { id: 'B01', type: 'blade', label: 'B01 Blade Server' },
      { id: 'B02', type: 'blade', label: 'B02 Blade Server' },
      { id: 'B03', type: 'blade', label: 'B03 Blade Server' },
      { id: 'B04', type: 'blade', label: 'B04 Blade Server' },
      { id: 'CRAC-2', type: 'crac', label: 'Liebert CRV 20KW (Movido In-Row)' },
      { id: 'B05', type: 'san', label: 'B05 Storage SAN' },
      { id: 'B06', type: 'san', label: 'B06 Storage NAS' },
    ],
    A: [
      { id: 'A01', type: 'server', label: 'A01 Generic Server' },
      { id: 'A02', type: 'server', label: 'A02 Generic Server' },
      { id: 'A03', type: 'blade', label: 'A03 Blade Server' },
      { id: 'A04', type: 'blade', label: 'A04 Blade Server' },
      { id: 'CRAC-3', type: 'crac', label: 'Liebert CRV 20KW (NUEVO para N+1)' },
      { id: 'A05', type: 'blade', label: 'A05 Blade Server' },
      { id: 'A06', type: 'san', label: 'A06 Storage SAN' },
      { id: 'A07', type: 'network', label: 'A07 Networking' },
    ]
  };

  const handleItemClick = (item) => setSelectedItem(item);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header con Controles */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 mb-2">Data Center Tier III - Grado de Ingeniería</h1>
            <p className="text-slate-600">Layout Arquitectónico con Aislamiento de Cuarto Eléctrico</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowMeasurements(!showMeasurements)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors border-2 ${showMeasurements ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'}`}
            >
              <Ruler size={18} /> {showMeasurements ? 'Ocultar Cotas' : 'Mostrar Cotas'}
            </button>
            <button 
              onClick={() => setShowCables(!showCables)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors border-2 ${showCables ? 'bg-amber-100 border-amber-400 text-amber-800 shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'}`}
            >
              <Cable size={18} /> {showCables ? 'Ocultar Cables' : 'Mostrar Cables'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Floor Plan (Sala Blanca) */}
          <div className="flex-grow bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto relative">
            
            {/* Leyenda de Cables si están activos */}
            {showCables && (
              <div className="mb-4 flex gap-4 text-xs font-bold bg-slate-50 p-3 rounded border border-slate-200 animate-in fade-in duration-300">
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-red-500"></div> Potencia Vía A (UPS A)</div>
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-blue-500"></div> Potencia Vía B (UPS B)</div>
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-yellow-400"></div> Datos / Fibra Óptica</div>
              </div>
            )}

            <div className="min-w-[700px] border-4 border-slate-800 p-8 pt-14 relative rounded bg-white mt-4 shadow-inner">
              
              {/* Etiqueta PRINCIPAL de Sala Blanca */}
              <div className="absolute top-0 left-0 bg-slate-800 text-white px-6 py-2 rounded-br-2xl font-black text-sm z-40 shadow-lg flex items-center gap-2 border-b-2 border-r-2 border-slate-700">
                <Server size={18} className="text-emerald-400" /> SALA BLANCA (ÁREA IT)
              </div>

              {/* Contenedor de Marca de Agua (Evita que se salga del recuadro) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 font-black text-[100px] opacity-80 whitespace-nowrap -rotate-12 select-none">
                  SALA BLANCA
                </div>
              </div>

              {/* --- COTAS GENERALES SALA BLANCA (CAD STYLE) --- */}
              {showMeasurements && (
                <div className="absolute inset-0 pointer-events-none z-50 animate-in fade-in">
                  {/* Cota Superior (Largo) */}
                  <div className="absolute -top-5 left-0 right-0 h-4 border-x-2 border-t-2 border-slate-400">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-black text-slate-600 tracking-widest">10.00 m (LARGO INTERIOR)</span>
                  </div>
                  {/* Cota Lateral (Ancho) */}
                  <div className="absolute top-0 -left-5 bottom-0 w-4 border-y-2 border-l-2 border-slate-400 flex items-center justify-center">
                    <span className="bg-white px-3 text-xs font-black text-slate-600 tracking-widest -rotate-90 whitespace-nowrap">8.00 m (ANCHO INTERIOR)</span>
                  </div>
                </div>
              )}

              {/* OVERLAY DE CABLES (ATRAVESANDO LA PARED) */}
              {showCables && (
                <div className="absolute inset-0 pointer-events-none z-30 animate-in fade-in duration-500">
                  
                  {/* --- BANDEJAS PORTACABLES (ESTRUCTURA METÁLICA) --- */}
                  {/* Bandeja Vertical Principal */}
                  <div className="absolute top-[50px] right-[22px] w-[48px] h-[495px] bg-slate-300/30 border-x-2 border-slate-400/50 shadow-inner z-0"
                       style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(148,163,184,0.4) 30px, rgba(148,163,184,0.4) 34px)' }}>
                  </div>
                  {/* Bandeja Horizontal Fila C */}
                  <div className="absolute top-[135px] left-[40px] right-[22px] h-[54px] bg-slate-300/30 border-y-2 border-slate-400/50 shadow-inner z-0"
                       style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(148,163,184,0.4) 30px, rgba(148,163,184,0.4) 34px)' }}>
                  </div>
                  {/* Bandeja Horizontal Fila B */}
                  <div className="absolute top-[327px] left-[40px] right-[22px] h-[54px] bg-slate-300/30 border-y-2 border-slate-400/50 shadow-inner z-0"
                       style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(148,163,184,0.4) 30px, rgba(148,163,184,0.4) 34px)' }}>
                  </div>
                  {/* Bandeja Horizontal Fila A */}
                  <div className="absolute top-[519px] left-[40px] right-[22px] h-[54px] bg-slate-300/30 border-y-2 border-slate-400/50 shadow-inner z-0"
                       style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(148,163,184,0.4) 30px, rgba(148,163,184,0.4) 34px)' }}>
                  </div>

                  {/* --- RAMALES HORIZONTALES (Atraviesan los racks) --- */}
                  <div className="absolute top-[145px] left-[50px] right-[30px] h-2 bg-yellow-400/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[160px] left-[50px] right-[45px] h-2 bg-red-500/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[175px] left-[50px] right-[60px] h-2 bg-blue-500/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>

                  <div className="absolute top-[337px] left-[50px] right-[30px] h-2 bg-yellow-400/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[352px] left-[50px] right-[45px] h-2 bg-red-500/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[367px] left-[50px] right-[60px] h-2 bg-blue-500/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>

                  <div className="absolute top-[529px] left-[50px] right-[30px] h-2 bg-yellow-400/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[544px] left-[50px] right-[45px] h-2 bg-red-500/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[559px] left-[50px] right-[60px] h-2 bg-blue-500/90 rounded-l shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>

                  {/* --- TRONCALES VERTICALES (Suben hacia el techo) --- */}
                  <div className="absolute top-[60px] right-[30px] w-2 h-[471px] bg-yellow-400/90 rounded shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[75px] right-[45px] w-2 h-[471px] bg-red-500/90 rounded shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[90px] right-[60px] w-2 h-[471px] bg-blue-500/90 rounded shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>

                  {/* --- SALIDAS HORIZONTALES (Atravesando la pared derecha hacia el Cortafuego) --- */}
                  <div className="absolute top-[60px] right-[-32px] w-[62px] h-2 bg-yellow-400/90 shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[75px] right-[-32px] w-[77px] h-2 bg-red-500/90 shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                  <div className="absolute top-[90px] right-[-32px] w-[92px] h-2 bg-blue-500/90 shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10"></div>
                </div>
              )}

              {/* Puerta Principal IT */}
              <div className="absolute top-0 right-1/4 w-16 h-2 bg-white border-x-2 border-slate-800 -mt-2 flex items-center justify-center text-[10px] font-bold text-slate-500">
                <DoorOpen size={14}/> IT
              </div>

              {/* SALA PRINCIPAL BLANCA */}
              <div className="flex flex-col gap-2 relative z-0 mt-3">
                
                {/* Cold Aisle 2 (Alimenta solo Fila C) */}
                <div className="bg-blue-100/60 border border-blue-200 rounded p-2 flex items-center justify-between h-16 relative">
                  {showMeasurements && (
                    <div className="absolute inset-y-1 left-1 w-3 border-y-2 border-l-2 border-blue-400 pointer-events-none flex items-center justify-center z-10">
                      <span className="bg-blue-100 text-blue-900 text-[9px] font-black -rotate-90 whitespace-nowrap px-1 shadow-sm border border-blue-200">1.20 m</span>
                    </div>
                  )}
                  <div className="text-blue-800 font-bold flex items-center gap-2 pl-6">
                    <Wind size={20}/> PASILLO FRÍO #2
                  </div>
                  <div className="flex gap-4 text-blue-500">
                    <ArrowDown /><ArrowDown /><ArrowDown /><ArrowDown />
                  </div>
                </div>

                {/* ROW C */}
                <div className="flex gap-2 px-4 justify-between bg-slate-200/50 py-2 rounded relative">
                  {showMeasurements && (
                    <div className="absolute inset-y-1 left-1 w-3 border-y-2 border-l-2 border-slate-400 pointer-events-none flex items-center justify-center z-10">
                      <span className="bg-slate-200 text-slate-700 text-[9px] font-black -rotate-90 whitespace-nowrap px-1 shadow-sm border border-slate-300">1.00 m</span>
                    </div>
                  )}
                  <div className="w-1"></div>
                  {rows.C.map((rack, i) => <Rack key={i} {...rack} onClick={handleItemClick} />)}
                </div>

                {/* Hot Aisle 1 (Retorno de Fila C y Fila B) */}
                <div className="bg-red-100/60 border border-red-200 rounded p-2 flex items-center justify-between h-16 relative">
                  {showMeasurements && (
                    <div className="absolute inset-y-1 left-1 w-3 border-y-2 border-l-2 border-red-400 pointer-events-none flex items-center justify-center z-10">
                      <span className="bg-red-100 text-red-900 text-[9px] font-black -rotate-90 whitespace-nowrap px-1 shadow-sm border border-red-200">1.00 m</span>
                    </div>
                  )}
                  <div className="text-red-800 font-bold flex items-center gap-2 pl-6">
                    <Zap size={20}/> PASILLO CALIENTE #1
                  </div>
                  <div className="flex gap-4 text-red-400">
                    {/* El aire caliente sale de C (hacia abajo) y de B (hacia arriba) */}
                    <ArrowUp /><ArrowDown /><ArrowUp /><ArrowDown />
                  </div>
                </div>

                {/* ROW B */}
                <div className="flex gap-2 px-4 justify-between bg-slate-200/50 py-2 rounded relative">
                  {showMeasurements && (
                    <div className="absolute inset-y-1 left-1 w-3 border-y-2 border-l-2 border-slate-400 pointer-events-none flex items-center justify-center z-10">
                      <span className="bg-slate-200 text-slate-700 text-[9px] font-black -rotate-90 whitespace-nowrap px-1 shadow-sm border border-slate-300">1.00 m</span>
                    </div>
                  )}
                  <div className="w-1"></div>
                  {rows.B.map((rack, i) => <Rack key={i} {...rack} onClick={handleItemClick} />)}
                </div>

                {/* Cold Aisle 1 (Alimenta Fila B y Fila A) - CORREGIDO */}
                <div className="bg-blue-100/60 border border-blue-200 rounded p-2 flex items-center justify-between h-16 relative">
                  {showMeasurements && (
                    <div className="absolute inset-y-1 left-1 w-3 border-y-2 border-l-2 border-blue-400 pointer-events-none flex items-center justify-center z-10">
                      <span className="bg-blue-100 text-blue-900 text-[9px] font-black -rotate-90 whitespace-nowrap px-1 shadow-sm border border-blue-200">1.20 m</span>
                    </div>
                  )}
                  <div className="text-blue-800 font-bold flex items-center gap-2 pl-6">
                    <Wind size={20}/> PASILLO FRÍO #1
                  </div>
                  <div className="flex gap-4 text-blue-500">
                    {/* El aire frío entra a B (hacia arriba) y a A (hacia abajo) */}
                    <ArrowUp /><ArrowDown /><ArrowUp /><ArrowDown />
                  </div>
                </div>

                {/* ROW A */}
                <div className="flex gap-2 px-4 justify-between bg-slate-200/50 py-2 rounded relative">
                  {showMeasurements && (
                    <div className="absolute inset-y-1 left-1 w-3 border-y-2 border-l-2 border-slate-400 pointer-events-none flex items-center justify-center z-10">
                      <span className="bg-slate-200 text-slate-700 text-[9px] font-black -rotate-90 whitespace-nowrap px-1 shadow-sm border border-slate-300">1.00 m</span>
                    </div>
                  )}
                  <div className="w-1"></div>
                  {rows.A.map((rack, i) => <Rack key={i} {...rack} onClick={handleItemClick} />)}
                </div>

                {/* Hot Aisle 2 (Retorno de Fila A) */}
                <div className="bg-red-100/80 border-2 border-red-400 border-dashed rounded p-2 flex items-center justify-between h-16 relative overflow-hidden shadow-inner">
                  {showMeasurements && (
                    <div className="absolute inset-y-1 left-1 w-3 border-y-2 border-l-2 border-red-400 pointer-events-none flex items-center justify-center z-20">
                      <span className="bg-red-100 text-red-950 text-[9px] font-black -rotate-90 whitespace-nowrap px-1 shadow-sm border border-red-300">1.00 m</span>
                    </div>
                  )}
                  <div className="text-red-900 font-bold flex items-center gap-2 z-10 pl-6">
                    <Zap size={20}/> PASILLO CALIENTE #2
                  </div>
                  <div className="flex gap-4 text-red-500 z-10">
                    <ArrowDown /><ArrowDown /><ArrowDown /><ArrowDown />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.1)_10px,rgba(239,68,68,0.1)_20px)]"></div>
                </div>

              </div>
            </div>
          </div>

          {/* MURO CORTAFUEGO (FIREWALL) CON CABLES PASANDO */}
          <div className="hidden lg:flex flex-col items-center justify-center w-6 bg-slate-400 rounded-lg shadow-inner border-x-4 border-slate-500 relative z-30">
             
             {/* Animación de los cables atravesando el muro */}
             {showCables && (
                <div className="absolute top-[108px] left-0 w-full flex flex-col gap-[7px] z-40 animate-in fade-in duration-500 pointer-events-none">
                    <div className="w-[180%] h-2 bg-yellow-400/90 shadow text-[8px] font-black text-yellow-900 leading-none overflow-visible whitespace-nowrap -ml-2">→ DATOS</div>
                    <div className="w-[180%] h-2 bg-red-500/90 shadow text-[8px] font-black text-white leading-none overflow-visible whitespace-nowrap -ml-2">→ UPS A</div>
                    <div className="w-[180%] h-2 bg-blue-500/90 shadow text-[8px] font-black text-white leading-none overflow-visible whitespace-nowrap -ml-2">→ UPS B</div>
                </div>
             )}

             <div className="rotate-90 whitespace-nowrap text-slate-200 font-black text-xs tracking-[0.2em] opacity-80">
               MURO CORTAFUEGO F-120
             </div>
          </div>

          {/* CUARTO ELÉCTRICO Y DE RESPALDO (AMPLIADO A 400px) */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6 relative z-20 mt-4 lg:mt-0">
            
            {/* --- COTAS GENERALES CUARTO ELÉCTRICO (CAD STYLE) --- */}
            {showMeasurements && (
              <div className="absolute -top-1 left-0 right-0 h-3 border-x-2 border-t-2 border-slate-400 pointer-events-none z-50 animate-in fade-in hidden lg:block">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 px-3 text-xs font-black text-slate-600 tracking-widest border border-slate-300 rounded-sm shadow-sm">3.50 m (LARGO)</span>
              </div>
            )}

            <div className="bg-slate-300 border-4 border-slate-500 rounded-xl p-6 shadow-inner relative overflow-hidden min-h-[500px]">
              
              {/* Etiqueta PRINCIPAL de Cuarto Eléctrico */}
              <div className="absolute top-0 right-0 bg-slate-800 text-white px-4 py-2 rounded-bl-2xl font-black text-sm z-40 shadow-lg flex items-center gap-2 border-b-2 border-l-2 border-slate-700">
                <ShieldAlert size={18} className="text-amber-500" /> CUARTO ELÉCTRICO
              </div>

              {/* Marca de agua gigante de fondo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 font-black text-[60px] opacity-30 pointer-events-none z-0 whitespace-nowrap -rotate-90 select-none">
                ELÉCTRICO
              </div>

              {/* Puerta Técnica Independiente */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-100 border-x-2 border-slate-500 flex items-center justify-center text-[10px] font-bold text-slate-600 rounded-t z-40">
                 <DoorOpen size={12} className="mr-1"/> TÉCNICA
              </div>

              {/* --- COTAS INTERNAS DE INGENIERÍA --- */}
              {showMeasurements && (
                <>
                  {/* Cota de la Bandeja Portacables (Izquierda) */}
                  <div className="absolute top-[80px] left-[20px] w-[32px] h-[340px] pointer-events-none z-40 animate-in fade-in">
                     <div className="absolute -left-6 top-0 bottom-0 w-2 border-y-2 border-l-2 border-slate-400 flex items-center justify-center">
                        <span className="bg-slate-300 px-1 text-[9px] font-black text-slate-600 -rotate-90 whitespace-nowrap shadow-sm border border-slate-400">0.60 m (BANDEJAS)</span>
                     </div>
                  </div>

                  {/* ZONA VISUAL DE MANTENIMIENTO DESPEJADA */}
                  <div className="absolute top-[100px] bottom-[50px] left-[230px] right-[20px] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(245,158,11,0.15)_10px,rgba(245,158,11,0.15)_20px)] border-2 border-dashed border-amber-500/40 rounded pointer-events-none z-0 flex items-center justify-center animate-in fade-in">
                     <span className="text-amber-600/60 font-black text-[10px] -rotate-90 text-center tracking-widest whitespace-nowrap">
                       ÁREA LIBRE RETIE
                     </span>
                  </div>

                  {/* Cota de Mantenimiento / Área Libre (Abajo) */}
                  <div className="absolute bottom-[30px] left-[230px] right-[20px] pointer-events-none z-40 animate-in fade-in flex flex-col items-center">
                     <div className="w-full h-3 border-x-2 border-b-2 border-slate-500"></div>
                     <span className="text-[9px] font-black text-slate-700 mt-1 bg-slate-300 px-2 py-0.5 rounded-sm border border-slate-400 shadow-sm whitespace-nowrap">1.50 m (ÁREA MANTENIMIENTO)</span>
                  </div>
                </>
              )}

              {/* --- ENRUTAMIENTO DE CABLES EN CUARTO ELÉCTRICO --- */}
              {showCables && (
                <div className="absolute inset-0 pointer-events-none z-30 animate-in fade-in duration-500">
                  
                  {/* PASAMUROS (ENTRADA MUY VISIBLE) */}
                  <div className="absolute top-[74px] left-[-26px] w-[36px] h-[52px] bg-slate-800 border-y-4 border-r-4 border-slate-600 rounded-r shadow-inner flex items-center justify-center z-10">
                    <div className="w-2 h-full bg-black/60 rounded-sm"></div>
                  </div>
                  <div className="absolute top-[54px] left-[-24px] text-[8px] font-black text-slate-100 bg-slate-800 px-1.5 py-0.5 rounded shadow-md z-40 whitespace-nowrap border border-slate-600">
                    ↓ PASAMUROS
                  </div>

                  {/* BANDEJA PORTACABLES (DUCTO VISUAL) */}
                  <div className="absolute top-[80px] left-[20px] w-[32px] h-[350px] bg-slate-900/10 border-x-2 border-dashed border-slate-500/30 rounded-t shadow-inner z-0 flex flex-col items-center py-2 gap-8">
                     <div className="w-4 h-1 bg-slate-400/40"></div>
                     <div className="w-4 h-1 bg-slate-400/40"></div>
                     <div className="w-4 h-1 bg-slate-400/40"></div>
                     <div className="w-4 h-1 bg-slate-400/40"></div>
                     <div className="w-4 h-1 bg-slate-400/40"></div>
                  </div>

                  {/* 1. CABLE AMARILLO (DATOS -> NOC) */}
                  <div className="absolute top-[84px] left-[-10px] w-[32px] h-2 bg-yellow-400/90 shadow rounded-r z-10"></div>
                  <div className="absolute top-[84px] left-[22px] w-2 h-[41px] bg-yellow-400/90 shadow rounded-b z-10"></div>
                  <div className="absolute top-[125px] left-[22px] w-[52px] h-2 bg-yellow-400/90 shadow rounded-r z-10"></div>

                  {/* 2. CABLE AZUL (ENERGÍA B -> UPS B) */}
                  <div className="absolute top-[99px] left-[-10px] w-[42px] h-2 bg-blue-500/90 shadow rounded-r z-20"></div>
                  <div className="absolute top-[99px] left-[32px] w-2 h-[200px] bg-blue-500/90 shadow rounded-b z-20"></div>
                  <div className="absolute top-[299px] left-[32px] w-[42px] h-2 bg-blue-500/90 shadow rounded-r z-20"></div>

                  {/* 3. CABLE ROJO (ENERGÍA A -> UPS A) */}
                  <div className="absolute top-[114px] left-[-10px] w-[52px] h-2 bg-red-500/90 shadow rounded-r z-30"></div>
                  <div className="absolute top-[114px] left-[42px] w-2 h-[243px] bg-red-500/90 shadow rounded-b z-30"></div>
                  <div className="absolute top-[357px] left-[42px] w-[32px] h-2 bg-red-500/90 shadow rounded-r z-30"></div>
                </div>
              )}

              <div className="mt-8 mb-4 relative z-10 ml-[50px]">
                <p className="text-[10px] text-slate-600 font-bold bg-white/50 p-2 rounded border border-slate-400 leading-tight">
                  *Separación física (Tier III) para mitigar riesgo de incendio y regular acceso.
                </p>
              </div>

              {/* CONTENEDOR DE EQUIPOS ORDENADO Y SIN CHOCAR CON LA ZONA DE MANTENIMIENTO */}
              <div className="space-y-4 relative z-10 ml-[50px] w-[140px]">
                
                {/* Consola NOC */}
                <div 
                  className={`p-3 rounded text-sm cursor-pointer transition-all duration-300 border-2 relative
                    ${showCables ? 'bg-yellow-50 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'bg-purple-100 border-purple-300 hover:bg-purple-200 shadow-sm'}`} 
                  onClick={() => handleItemClick({label: "Consola NOC / KVM", type: "Administración"})}
                >
                  <div className="relative z-10">
                    <div className={`font-bold ${showCables ? 'text-yellow-700' : 'text-purple-900'} text-[10px] leading-tight`}>CONSOLA NOC</div>
                  </div>
                </div>

                {/* PDU */}
                <div className="bg-orange-100 border-2 border-orange-400 p-3 rounded text-sm cursor-pointer hover:bg-orange-200 shadow-sm" onClick={() => handleItemClick({label: "PDU Principal + ATS", type: "Energía"})}>
                  <div className="font-bold text-orange-900 text-[10px] leading-tight">PDU + ATS</div>
                </div>

                {/* Generador */}
                <div className="bg-green-100 border-2 border-green-500 p-3 rounded text-sm relative overflow-hidden cursor-pointer hover:bg-green-200 shadow-sm" onClick={() => handleItemClick({label: "Generador Diésel 50KVA", type: "Respaldo Energía"})}>
                  <div className="font-bold text-green-900 text-[10px] leading-tight pr-4">GEN DIÉSEL</div>
                  <ShieldAlert size={14} className="absolute top-2 right-2 text-green-600" />
                </div>

                {/* UPS B */}
                <div 
                  className={`p-3 rounded text-sm cursor-pointer transition-all duration-300 border-2 relative
                    ${showCables ? 'bg-blue-50 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-yellow-100 border-yellow-500 hover:bg-yellow-200 shadow-sm'}`} 
                  onClick={() => handleItemClick({label: "UPS-B (N+1)", type: "Energía"})}
                >
                  <div className="relative z-10">
                    <div className={`font-bold ${showCables ? 'text-blue-700' : 'text-yellow-900'} text-[10px] leading-tight`}>UPS-B (N+1)</div>
                  </div>
                </div>
                  
                {/* UPS A */}
                <div 
                  className={`p-3 rounded text-sm cursor-pointer transition-all duration-300 border-2 relative
                    ${showCables ? 'bg-red-50 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-yellow-100 border-yellow-500 hover:bg-yellow-200 shadow-sm'}`} 
                  onClick={() => handleItemClick({label: "UPS-A", type: "Energía"})}
                >
                  <div className="relative z-10">
                    <div className={`font-bold ${showCables ? 'text-red-700' : 'text-yellow-900'} text-[10px] leading-tight`}>UPS-A</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Panel de Información del Elemento */}
            <div className="bg-slate-800 text-slate-100 p-5 rounded-xl shadow-lg border border-slate-700 flex-grow relative z-20">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Info size={20} />
                <h3 className="font-bold text-lg">Detalles del Equipo</h3>
              </div>
              
              {selectedItem ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
                    {selectedItem.id || 'ZONA'}
                  </p>
                  <p className="text-xl font-bold text-white">
                    {selectedItem.label}
                  </p>
                  <p className="text-sm text-slate-300 mt-4 pt-4 border-t border-slate-700">
                    Tipo: <span className="capitalize text-sky-300">{selectedItem.type}</span>
                  </p>
                  {selectedItem.type === 'crac' && (
                    <div className="mt-4 p-3 bg-cyan-950/50 border border-cyan-800 rounded text-xs text-cyan-200 leading-relaxed">
                      <strong>Nota de Diseño:</strong> Equipo movido a posición In-Row para maximizar eficiencia PUE.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-slate-500 py-8 flex flex-col items-center">
                  <Server size={32} className="mb-3 opacity-20" />
                  <p className="text-sm">Haz clic en cualquier rack o enciende las superposiciones arriba.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}