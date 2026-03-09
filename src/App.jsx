import React, { useState } from 'react';
import { Info, ArrowDown, ArrowUp, Zap, Server, Wind, ShieldAlert } from 'lucide-react';

const Rack = ({ id, type, label, onClick }) => {
  // Diccionario de colores basado en la leyenda original
  const typeStyles = {
    server: 'bg-emerald-800 text-emerald-50 border-emerald-900',
    blade: 'bg-gray-800 text-gray-100 border-gray-900',
    san: 'bg-indigo-900 text-indigo-100 border-indigo-950',
    network: 'bg-sky-400 text-sky-950 border-sky-500',
    firewall: 'bg-red-400 text-red-950 border-red-500',
    patch: 'bg-fuchsia-400 text-fuchsia-950 border-fuchsia-500',
    crac: 'bg-cyan-300 text-cyan-950 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10',
  };

  const baseStyle = "flex flex-col items-center justify-center p-2 text-xs font-bold text-center border-2 rounded cursor-pointer transition-transform hover:scale-105 h-24 min-w-[60px]";

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

  // Definición de las filas con las MEJORAS aplicadas (CRAC In-Row)
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-black text-slate-900 mb-2">Data Center Tier III - Layout Optimizado</h1>
          <p className="text-slate-600">Medellín, Colombia | Área: 80 m² | Mejoras de Eficiencia de Enfriamiento Aplicadas</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Floor Plan */}
          <div className="flex-grow bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
            <div className="min-w-[700px] border-4 border-slate-800 p-2 relative rounded bg-slate-50">
              
              {/* Puerta */}
              <div className="absolute top-0 right-1/4 w-16 h-2 bg-white border-x-2 border-slate-800 -mt-2 flex items-center justify-center text-[10px] font-bold">
                ACCESO
              </div>

              {/* SALA PRINCIPAL BLANCA */}
              <div className="flex flex-col gap-2">
                
                {/* Cold Aisle 2 */}
                <div className="bg-blue-100/60 border border-blue-200 rounded p-2 flex items-center justify-between h-16">
                  <div className="text-blue-800 font-bold flex items-center gap-2">
                    <Wind size={20}/> PASILLO FRÍO #2 (18-22°C)
                  </div>
                  <div className="flex gap-4 text-blue-500">
                    <ArrowDown /><ArrowDown /><ArrowDown /><ArrowDown />
                  </div>
                </div>

                {/* ROW C */}
                <div className="flex gap-2 px-4 justify-between bg-slate-200/50 py-2 rounded">
                  {rows.C.map((rack, i) => (
                    <Rack key={i} {...rack} onClick={handleItemClick} />
                  ))}
                </div>

                {/* Hot Aisle 1 */}
                <div className="bg-red-100/60 border border-red-200 rounded p-2 flex items-center justify-between h-16">
                  <div className="text-red-800 font-bold flex items-center gap-2">
                    <Zap size={20}/> PASILLO CALIENTE #1 (28-32°C)
                  </div>
                  <div className="flex gap-4 text-red-400">
                    <ArrowUp /><ArrowDown /><ArrowUp /><ArrowDown />
                  </div>
                </div>

                {/* ROW B */}
                <div className="flex gap-2 px-4 justify-between bg-slate-200/50 py-2 rounded">
                  {rows.B.map((rack, i) => (
                    <Rack key={i} {...rack} onClick={handleItemClick} />
                  ))}
                </div>

                {/* Cold Aisle 1 */}
                <div className="bg-blue-100/60 border border-blue-200 rounded p-2 flex items-center justify-between h-16">
                  <div className="text-blue-800 font-bold flex items-center gap-2">
                    <Wind size={20}/> PASILLO FRÍO #1 (18-22°C)
                  </div>
                  <div className="flex gap-4 text-blue-500">
                    <ArrowUp /><ArrowUp /><ArrowUp /><ArrowUp />
                  </div>
                </div>

                {/* ROW A */}
                <div className="flex gap-2 px-4 justify-between bg-slate-200/50 py-2 rounded">
                  {rows.A.map((rack, i) => (
                    <Rack key={i} {...rack} onClick={handleItemClick} />
                  ))}
                </div>

                {/* Hot Aisle 2 (NEW IMPROVEMENT) */}
                <div className="bg-red-100/80 border-2 border-red-400 border-dashed rounded p-2 flex items-center justify-between h-16 relative overflow-hidden shadow-inner">
                  <div className="text-red-900 font-bold flex items-center gap-2 z-10">
                    <Zap size={20}/> PASILLO CALIENTE #2 (NUEVO RETORNO)
                  </div>
                  <div className="flex gap-4 text-red-500 z-10">
                    <ArrowDown /><ArrowDown /><ArrowDown /><ArrowDown />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.1)_10px,rgba(239,68,68,0.1)_20px)]"></div>
                </div>

              </div>
            </div>
          </div>

          {/* Sidebar: Zonas Especiales y Detalles */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            
            {/* Special Equipment Zone */}
            <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">ZONA EQUIPOS ESPECIALES</h3>
              <div className="space-y-3">
                
                <div className="bg-purple-100 border-2 border-purple-300 p-3 rounded text-sm cursor-pointer hover:bg-purple-200" onClick={() => handleItemClick({label: "Consola NOC / KVM", type: "Administración"})}>
                  <div className="font-bold text-purple-900">CONSOLA NOC/KVM</div>
                  <div className="text-purple-700 text-xs">Avocent DSView</div>
                </div>

                <div className="bg-orange-100 border-2 border-orange-300 p-3 rounded text-sm cursor-pointer hover:bg-orange-200" onClick={() => handleItemClick({label: "PDU Principal + ATS", type: "Energía"})}>
                  <div className="font-bold text-orange-900">PDU PRINCIPAL + ATS</div>
                  <div className="text-orange-700 text-xs">APC Schneider ATS</div>
                </div>

                <div className="bg-green-100 border-2 border-green-400 p-3 rounded text-sm relative overflow-hidden cursor-pointer hover:bg-green-200" onClick={() => handleItemClick({label: "Generador Diésel 50KVA", type: "Respaldo Energía"})}>
                  <div className="font-bold text-green-900">GENERADOR DIÉSEL</div>
                  <div className="text-green-700 text-xs">Caterpillar DE50GC 50KVA</div>
                  <ShieldAlert size={16} className="absolute top-2 right-2 text-green-600" />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 bg-yellow-100 border-2 border-yellow-400 p-3 rounded text-sm cursor-pointer hover:bg-yellow-200" onClick={() => handleItemClick({label: "UPS-B (N+1)", type: "Energía"})}>
                    <div className="font-bold text-yellow-900">UPS-B</div>
                    <div className="text-yellow-700 text-xs">40kVA</div>
                  </div>
                  <div className="flex-1 bg-yellow-100 border-2 border-yellow-400 p-3 rounded text-sm cursor-pointer hover:bg-yellow-200" onClick={() => handleItemClick({label: "UPS-A", type: "Energía"})}>
                    <div className="font-bold text-yellow-900">UPS-A</div>
                    <div className="text-yellow-700 text-xs">40kVA</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Panel de Información del Elemento */}
            <div className="bg-slate-800 text-slate-100 p-5 rounded-xl shadow-lg border border-slate-700 flex-grow">
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
                      <strong>Nota de Diseño:</strong> Equipo movido a posición In-Row (entre los racks) para capturar el calor directamente en la fuente y maximizar la eficiencia PUE.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-slate-500 py-8 flex flex-col items-center">
                  <Server size={32} className="mb-3 opacity-20" />
                  <p className="text-sm">Haz clic en cualquier rack, aire (CRAC) o zona especial para ver sus detalles.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}