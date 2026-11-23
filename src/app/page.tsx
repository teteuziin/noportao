"use client";

import React, { useState } from "react";
import { 
  Car, 
  Smartphone, 
  TrendingDown, 
  ShieldCheck, 
  Navigation,
  Layers,
  Sparkles,
  Info
} from "lucide-react";
import DriverDashboard from "@/components/DriverDashboard";
import ParentView from "@/components/ParentView";
import ReportsView from "@/components/ReportsView";
import { initialRoute, initialStudents } from "@/lib/mockData";
import { Student, RouteInfo } from "@/lib/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"driver" | "parent" | "report">("driver");
  const [route, setRoute] = useState<RouteInfo>(initialRoute);
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // Handlers for driver actions
  const handleBoardStudent = (id: string) => {
    setStudents((prev) =>
      prev.map((s, index) => {
        if (s.id === id) {
          return { ...s, status: "boarded" };
        }
        // Advance next pending student to at_stop
        return s;
      })
    );
  };

  const handleNoShowStudent = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return { 
            ...s, 
            status: "no_show",
            accumulatedDelayMinutes: s.accumulatedDelayMinutes + 4,
            monthlyDelaysCount: s.monthlyDelaysCount + 1,
            monthlyPunctualityRate: Math.max(30, s.monthlyPunctualityRate - 12)
          };
        }
        return s;
      })
    );
  };

  // Handlers for parent actions
  const handleParentComingDown = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === "std-2" ? { ...s, guardianResponse: "coming_down" } : s))
    );
  };

  const handleParentAbsent = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === "std-2" ? { ...s, status: "absent", guardianResponse: "absent_today" } : s))
    );
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col font-sans selection:bg-[#FFB800] selection:text-slate-950 pb-20 sm:pb-8">
      
      {/* RESPONSIVE DESKTOP & MOBILE HEADER */}
      <header className="border-b border-[#1E293B] bg-[#0B1120]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-slate-900 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-900 rounded-full" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                No<span className="text-[#FFB800]">Portão</span>
              </span>
              <span className="hidden md:inline-block ml-3 text-[11px] uppercase tracking-widest text-slate-400 font-semibold border-l border-slate-700 pl-3">
                SaaS de Pontualidade no Transporte Escolar
              </span>
            </div>
          </div>

          {/* Top Quick Profile Switcher (Tablet & Desktop) */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#161F30] border border-[#233044]">
            <button
              onClick={() => setActiveTab("driver")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "driver"
                  ? "bg-[#FFB800] text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              Painel do Motorista
            </button>
            <button
              onClick={() => setActiveTab("parent")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "parent"
                  ? "bg-[#FFB800] text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Visão dos Pais (WhatsApp)
            </button>
            <button
              onClick={() => setActiveTab("report")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "report"
                  ? "bg-[#FFB800] text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              Relatório de Atrasos
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-[#FFB800] border border-amber-400/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="hidden xs:inline">Sistema</span> Ao Vivo
            </span>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        
        {/* VIEW 1: DRIVER DASHBOARD */}
        {activeTab === "driver" && (
          <DriverDashboard
            route={route}
            students={students}
            onBoardStudent={handleBoardStudent}
            onNoShowStudent={handleNoShowStudent}
          />
        )}

        {/* VIEW 2: PARENT EXPERIENCE */}
        {activeTab === "parent" && (
          <ParentView
            student={students[1]} // Pedro Henrique
            route={route}
            onConfirmComingDown={handleParentComingDown}
            onConfirmAbsent={handleParentAbsent}
          />
        )}

        {/* VIEW 3: TELEMETRY & NEGOTIATION REPORT */}
        {activeTab === "report" && (
          <ReportsView
            students={students}
            route={route}
          />
        )}

      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom on phones, app-style) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0B1120]/95 backdrop-blur-lg border-t border-slate-800 z-50 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab("driver")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === "driver" ? "text-[#FFB800]" : "text-slate-400"
          }`}
        >
          <Car className="w-5 h-5" />
          <span className="text-[10px] font-bold">Painel Van</span>
        </button>

        <button
          onClick={() => setActiveTab("parent")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === "parent" ? "text-[#FFB800]" : "text-slate-400"
          }`}
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] font-bold">Visão Família</span>
        </button>

        <button
          onClick={() => setActiveTab("report")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === "report" ? "text-[#FFB800]" : "text-slate-400"
          }`}
        >
          <TrendingDown className="w-5 h-5" />
          <span className="text-[10px] font-bold">Relatórios</span>
        </button>
      </nav>

    </div>
  );
}
