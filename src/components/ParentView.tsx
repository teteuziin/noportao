"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  UserX, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Bell, 
  ChevronRight,
  Award,
  AlertCircle
} from "lucide-react";
import { Student, RouteInfo } from "@/lib/types";

interface ParentViewProps {
  student: Student;
  route: RouteInfo;
  onConfirmComingDown: () => void;
  onConfirmAbsent: () => void;
}

export default function ParentView({
  student,
  route,
  onConfirmComingDown,
  onConfirmAbsent,
}: ParentViewProps) {
  const [responseState, setResponseState] = useState<"idle" | "descendo" | "ausente">("idle");
  const [absentReason, setAbsentReason] = useState<string>("");
  const [showAbsentModal, setShowAbsentModal] = useState<boolean>(false);

  const handleDescendo = () => {
    setResponseState("descendo");
    onConfirmComingDown();
  };

  const handleAbsent = (reason: string) => {
    setAbsentReason(reason);
    setResponseState("ausente");
    setShowAbsentModal(false);
    onConfirmAbsent();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* EXPLANATORY BANNER */}
      <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-4 text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB800] bg-[#FFB800]/10 px-3 py-1 rounded-full border border-[#FFB800]/30 inline-block mb-1.5">
          Experiência Zero Fricção para os Pais
        </span>
        <h2 className="text-lg font-black text-white">
          Aviso Rápido no WhatsApp ou no Web App
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Os pais não precisam decorar senhas ou instalar aplicativos pesados: tudo é confirmado com 1 toque direto na notificação.
        </p>
      </div>

      {/* WHATSAPP INTERACTION CARD (Mobile Frame) */}
      <div className="bg-[#121B22] border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl relative">
        
        {/* WhatsApp Top Bar */}
        <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-sm shadow">
            NP
          </div>
          <div>
            <div className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
              <span>NoPortão • {route.driverName}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] text-slate-400">Notificação Automática do Transporte Escolar</div>
          </div>
        </div>

        {/* Incoming Speech Bubble */}
        <div className="bg-[#1F2C34] rounded-2xl rounded-tl-sm p-4 text-slate-200 text-sm space-y-2.5 mb-5 shadow-md">
          <div className="flex items-center gap-2 text-[#FFB800] font-black text-sm">
            <Bell className="w-4 h-4 animate-bounce" />
            <span>ALERTA DE PROXIMIDADE • 5 MINUTOS</span>
          </div>

          <p className="text-slate-100 leading-relaxed text-sm">
            Olá, <strong>{student.guardianName}</strong>! A van está a <strong>1.1 km de distância (cerca de 5 minutos)</strong> do seu portão.
          </p>

          <p className="text-xs text-slate-300">
            Por favor, posicione o <strong>{student.name}</strong> no ponto com a mochila.
          </p>

          {/* Tolerance Notice */}
          <div className="bg-[#2A3942] rounded-xl p-3 border border-slate-700/60 text-xs text-amber-200/90 flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
            <div>
              <strong>Tempo contratual de espera: {route.contractualWaitMinutes} minutos.</strong>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Passou do tempo, o veículo precisa seguir a rota para não atrasar a chegada na escola.
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTION BUTTONS */}
        <div className="space-y-2.5">
          {/* Main Button: Tô Descendo */}
          <button
            onClick={handleDescendo}
            className={`w-full py-4 px-5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition transform active:scale-[0.99] ${
              responseState === "descendo"
                ? "bg-emerald-500 text-slate-950 ring-4 ring-emerald-400/30"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            <span>{responseState === "descendo" ? "✓ CONFIRMADO: TÔ DESCENDO!" : "CONFIRMAR: TÔ DESCENDO AGORA"}</span>
          </button>

          {/* Secondary Button: Não vou hoje */}
          <button
            onClick={() => setShowAbsentModal(true)}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              responseState === "ausente"
                ? "bg-red-500/20 text-red-400 border border-red-500"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }`}
          >
            <UserX className="w-4 h-4 text-slate-400" />
            <span>{responseState === "ausente" ? `✓ Aviso Registrado: ${absentReason || "Ausente hoje"}` : "Hoje o aluno NÃO vai de van"}</span>
          </button>
        </div>

        {/* Immediate Feedback Note */}
        {responseState !== "idle" && (
          <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center text-xs text-slate-300 animate-fadeIn">
            📡 <strong>Telemetria enviada:</strong> O painel da van já recebeu sua confirmação em tempo real!
          </div>
        )}

      </div>

      {/* FAMILY RECOGNITION & PUNCTUALITY SCORE CARD */}
      <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-5 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-bold text-sm text-white">Selo de Pontualidade da Família</h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
            {student.monthlyPunctualityRate}% Pontual
          </span>
        </div>

        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
          <div 
            className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
            style={{ width: `${student.monthlyPunctualityRate}%` }}
          />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {student.monthlyPunctualityRate >= 90 ? (
            <>🎉 <strong>Parabéns!</strong> A pontualidade da sua família ajuda a van a economizar de 30 a 45 minutos no mês e garante a renovação prioritária para o próximo ano.</>
          ) : (
            <>⚠️ <strong>Atenção:</strong> Neste mês houve atrasos acumulados acima da tolerância. Descer ao receber o alerta de 5 min ajuda todas as crianças a não chegarem atrasadas na escola.</>
          )}
        </p>
      </div>

      {/* ABSENCE REASON MODAL (Simulated) */}
      {showAbsentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="font-black text-white text-base">
              Por que {student.name} não vai hoje?
            </h4>
            <p className="text-xs text-slate-400">
              Avisar com antecedência exclui a parada e economiza 10 a 15 minutos para todos na van!
            </p>

            <div className="space-y-2">
              <button 
                onClick={() => handleAbsent("Acordou indisposto / doente")}
                className="w-full text-left p-3 rounded-xl bg-[#0B1120] hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 transition"
              >
                🤒 Acordou indisposto / doente
              </button>
              <button 
                onClick={() => handleAbsent("Os pais vão levar hoje")}
                className="w-full text-left p-3 rounded-xl bg-[#0B1120] hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 transition"
              >
                🚗 Nós mesmos vamos levar hoje
              </button>
              <button 
                onClick={() => handleAbsent("Compromisso / Viagem")}
                className="w-full text-left p-3 rounded-xl bg-[#0B1120] hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 transition"
              >
                ✈️ Compromisso da família / Viagem
              </button>
            </div>

            <button
              onClick={() => setShowAbsentModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
