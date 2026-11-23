"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  Navigation, 
  ChevronRight, 
  UserX,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { Student, RouteInfo } from "@/lib/types";

interface DriverDashboardProps {
  route: RouteInfo;
  students: Student[];
  onBoardStudent: (id: string) => void;
  onNoShowStudent: (id: string) => void;
}

export default function DriverDashboard({
  route,
  students,
  onBoardStudent,
  onNoShowStudent,
}: DriverDashboardProps) {
  // Find current active stop (first student that is at_stop or approaching)
  const currentStudent = students.find((s) => s.status === "at_stop") || students.find((s) => s.status === "approaching_5") || students[0];
  
  // Timer for current stop (default 3 minutes = 180 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(180);
  const [isOvertime, setIsOvertime] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          setIsOvertime(true);
          return prev - 1; // Negative counting for overtime!
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStudent?.id]);

  const formatTimer = (totalSeconds: number) => {
    const absSeconds = Math.abs(totalSeconds);
    const m = Math.floor(absSeconds / 60);
    const s = absSeconds % 60;
    const formatted = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return totalSeconds < 0 ? `+${formatted}` : formatted;
  };

  const getTimerColor = () => {
    if (secondsRemaining < 0) return "text-red-500 border-red-500/60 bg-red-500/10 animate-pulse";
    if (secondsRemaining <= 60) return "text-amber-400 border-amber-500/60 bg-amber-500/10";
    return "text-emerald-400 border-emerald-500/40 bg-emerald-500/5";
  };

  const boardedCount = students.filter((s) => s.status === "boarded").length;
  const totalCount = students.length;

  return (
    <div className="w-full space-y-4">
      {/* VEHICLE COCKPIT HEADER */}
      <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Telemetria Ativa • Modo Painel
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
            {route.name}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] uppercase font-bold text-slate-400">Chegada na Escola</div>
            <div className="text-sm font-black text-[#FFB800]">{route.schoolArrivalTime} (No Horário)</div>
          </div>
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-slate-300 hover:text-white"
            title={audioEnabled ? "Alertas sonoros ligados" : "Alertas sonoros mudos"}
          >
            {audioEnabled ? <Volume2 className="w-5 h-5 text-[#FFB800]" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* HERO CURRENT STOP CARD (Designed for easy touch while vehicle is stopped) */}
      <div className="bg-[#161F30] border-2 border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        
        {/* Top Stop Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              PARADA ATUAL • TOLERÂNCIA CONTRATUAL
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {currentStudent.name}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 flex items-center gap-1.5 mt-1">
              <span>{currentStudent.address}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-xs sm:text-sm">{currentStudent.neighborhood}</span>
            </p>
          </div>

          {/* Quick External Waze Button */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentStudent.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-white transition self-start sm:self-center"
          >
            <Navigation className="w-4 h-4 text-[#FFB800]" />
            Abrir GPS
          </a>
        </div>

        {/* MIDDLE SECTION: LIVE TIMER + GUARDIAN STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          
          {/* BIG CONTRATUAL COUNTDOWN TIMER */}
          <div className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${getTimerColor()}`}>
            <span className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {secondsRemaining >= 0 ? "Tempo Restante no Ponto" : "TEMPO EXCEDIDO (GERANDO ATRASO)"}
            </span>
            <div className="text-5xl sm:text-6xl font-black tracking-tight font-mono my-1">
              {formatTimer(secondsRemaining)}
            </div>
            <span className="text-xs font-semibold opacity-80">
              {secondsRemaining >= 0 
                ? `Tolerância máxima: ${route.contractualWaitMinutes} minutos` 
                : "Taxa de espera contratual aplicável / Telemetria gravada"}
            </span>
          </div>

          {/* GUARDIAN CONFIRMATION STATUS */}
          <div className="p-6 rounded-2xl bg-[#0B1120] border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Resposta da Família (WhatsApp / Web)
              </div>
              
              {currentStudent.guardianResponse === "coming_down" && (
                <div className="flex items-start gap-2.5 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-lg font-black leading-snug">"Tô descendo!"</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Confirmado por <strong>{currentStudent.guardianName}</strong> às {currentStudent.confirmedAt || "06:53"}
                    </div>
                  </div>
                </div>
              )}

              {currentStudent.guardianResponse === "waiting" && (
                <div className="flex items-start gap-2.5 text-amber-400">
                  <Clock className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-lg font-black leading-snug">Aguardando Confirmação</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Alerta de 5 min enviado. Sem toque do responsável ainda.
                    </div>
                  </div>
                </div>
              )}

              {currentStudent.guardianResponse === "absent_today" && (
                <div className="flex items-start gap-2.5 text-red-400">
                  <UserX className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-lg font-black leading-snug">Não Vai Hoje</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Família avisou com antecedência. Parada pulada.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact Link */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{currentStudent.guardianName} ({currentStudent.guardianPhone})</span>
              <a 
                href={`tel:${currentStudent.guardianPhone.replace(/\D/g, '')}`}
                className="text-[#FFB800] hover:underline font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> Ligar
              </a>
            </div>
          </div>

        </div>

        {/* PRIMARY TOUCH ACTION BUTTONS (MASSIVE SIZES FOR IN-CAR USE) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Green Hero Button: Boarded */}
          <button
            onClick={() => {
              onBoardStudent(currentStudent.id);
              setSecondsRemaining(180);
              setIsOvertime(false);
            }}
            className="sm:col-span-2 py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 transition"
          >
            <CheckCircle2 className="w-6 h-6 text-slate-950" />
            <span>ALUNO EMBARCOU • SEGUIR ROTA</span>
          </button>

          {/* Red Button: Timeout / No-show */}
          <button
            onClick={() => {
              onNoShowStudent(currentStudent.id);
              setSecondsRemaining(180);
              setIsOvertime(false);
            }}
            className="py-4 px-4 rounded-2xl bg-slate-800 hover:bg-red-500/20 hover:border-red-500/60 border border-slate-700 text-slate-300 hover:text-red-400 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <UserX className="w-5 h-5" />
            <span>Não Compareceu (Seguir)</span>
          </button>

        </div>
      </div>

      {/* ROUTE QUEUE LIST (Next Stops Overview) */}
      <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-4 sm:p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Fila de Paradas ({boardedCount} de {totalCount} embarcados)
          </div>
          <span className="text-xs text-slate-500 font-medium">Ordem inteligente da rota</span>
        </div>

        <div className="space-y-2.5">
          {students.map((student, idx) => {
            const isCurrent = student.id === currentStudent.id;
            const isBoarded = student.status === "boarded";
            const isAbsent = student.status === "absent";

            return (
              <div 
                key={student.id}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition ${
                  isCurrent
                    ? "bg-[#FFB800]/10 border-[#FFB800] ring-1 ring-[#FFB800]"
                    : isBoarded
                    ? "bg-slate-900/60 border-slate-800 text-slate-400 opacity-60"
                    : isAbsent
                    ? "bg-red-950/20 border-red-900/30 text-slate-400 opacity-50 line-through"
                    : "bg-[#0B1120] border-slate-750 text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                    isBoarded ? "bg-emerald-500/20 text-emerald-400" : isCurrent ? "bg-[#FFB800] text-slate-950" : "bg-slate-800 text-slate-400"
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{student.name}</span>
                      {isBoarded && <span className="text-[11px] text-emerald-400 font-normal no-underline">✓ Embarcado</span>}
                      {isAbsent && <span className="text-[11px] text-red-400 font-normal no-underline">Ausente (Avisado)</span>}
                    </div>
                    <div className="text-xs text-slate-400 no-underline">
                      {student.address} • {student.neighborhood}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Previsto: {student.pickupTimeScheduled}
                  </span>
                  {student.monthlyPunctualityRate < 70 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30" title="Histórico frequente de atrasos no portão">
                      Atrasos recorrentes
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
