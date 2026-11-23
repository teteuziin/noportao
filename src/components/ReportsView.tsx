"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  AlertTriangle, 
  TrendingDown, 
  Fuel, 
  Clock, 
  MessageCircle,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { Student, RouteInfo } from "@/lib/types";

interface ReportsViewProps {
  students: Student[];
  route: RouteInfo;
}

export default function ReportsView({ students, route }: ReportsViewProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>("std-2"); // Default to Pedro
  const [copied, setCopied] = useState<boolean>(false);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  // Total accumulated delay across the whole route
  const totalDelayMinutes = students.reduce((acc, curr) => acc + curr.accumulatedDelayMinutes, 0);
  const estimatedFuelWasted = (totalDelayMinutes / 60) * 18.5; // ~R$ 18.50 per hour idling with AC

  // Generated WhatsApp Negotiation Message
  const negotiationMessage = `Olá, ${selectedStudent.guardianName}! Tudo bem? Aqui é o ${route.driverName} do transporte escolar.

Estou te enviando o resumo de telemetria do NoPortão deste mês do ${selectedStudent.name}:
⏱️ Espera acumulada no portão: ${selectedStudent.accumulatedDelayMinutes} minutos
🛑 Paradas com atraso acima de 3 min: ${selectedStudent.monthlyDelaysCount} dias

Como esse tempo acumulado impacta o horário de chegada de todos os alunos no ${route.schoolName}, gostaria de ver com você:
1) Podemos adiantar o horário do ponto dele em 5 minutos para que vocês fiquem mais tranquilos?
2) Ou prefere que ajustemos conforme a cláusula de tolerância do contrato?

Agradeço muito a parceria para mantermos as crianças no horário! Abraço.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(negotiationMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* SUMMARY STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400 mb-2">
            <span>Tempo Perdido no Mês</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {totalDelayMinutes} min
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tempo que a van ficou parada no portão acima dos 3 min contratuais.
          </p>
        </div>

        <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400 mb-2">
            <span>Combustível Desperdiçado</span>
            <Fuel className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-black text-red-400">
            ~R$ {estimatedFuelWasted.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gasto estimado de motor ocioso e ar-condicionado na porta.
          </p>
        </div>

        <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400 mb-2">
            <span>Proteção Contra Culpa</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">
            100% Prova
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Telemetria com carimbo de GPS e horário irrefutável.
          </p>
        </div>

      </div>

      {/* FULL TELEMETRY TABLE */}
      <div className="bg-[#161F30] border border-[#233044] rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Auditoria de Rota • Novembro / 2026
            </div>
            <h3 className="text-xl font-black text-white">
              Pontualidade por Aluno / Ponto de Coleta
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#FFB800]" />
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700/60 text-xs font-bold text-slate-400 uppercase">
                <th className="py-3 px-3">Aluno</th>
                <th className="py-3 px-3">Responsável</th>
                <th className="py-3 px-3">Pontualidade</th>
                <th className="py-3 px-3">Espera Acumulada</th>
                <th className="py-3 px-3">Atrasos &gt; 3m</th>
                <th className="py-3 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {students.map((student) => {
                const isSelected = student.id === selectedStudentId;
                const hasExcessDelay = student.monthlyPunctualityRate < 70;

                return (
                  <tr 
                    key={student.id} 
                    className={`transition cursor-pointer ${
                      isSelected ? "bg-amber-500/10" : "hover:bg-slate-800/40"
                    }`}
                    onClick={() => setSelectedStudentId(student.id)}
                  >
                    <td className="py-3.5 px-3 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{student.name}</span>
                        {hasExcessDelay && (
                          <span className="w-2 h-2 rounded-full bg-red-500" title="Atrasos frequentes" />
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300">{student.guardianName}</td>
                    <td className="py-3.5 px-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        student.monthlyPunctualityRate >= 90
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : student.monthlyPunctualityRate >= 75
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {student.monthlyPunctualityRate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-200">
                      {student.accumulatedDelayMinutes} min
                    </td>
                    <td className="py-3.5 px-3 text-slate-300">
                      {student.monthlyDelaysCount} vezes
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentId(student.id);
                        }}
                        className="text-xs font-bold text-[#FFB800] hover:underline"
                      >
                        Ver Mensagem →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* WHATSAPP NEGOTIATION GENERATOR CARD */}
      <div className="bg-[#161F30] border-2 border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          <MessageCircle className="w-4 h-4 text-[#FFB800]" />
          <span>Gerador de Negociação Sem Conflito (Baseado em Fatos)</span>
        </div>

        <h3 className="text-lg font-black text-white mb-2">
          Mensagem Pronta para Enviar a {selectedStudent.guardianName} (Mãe/Pai do {selectedStudent.name})
        </h3>
        
        <p className="text-xs text-slate-400 mb-4">
          Elimina o "achismo". Você apresenta os dados frios do aplicativo de forma educada e propõe adiantar o ponto ou aplicar o contrato.
        </p>

        {/* Message Preview Box */}
        <div className="bg-[#0B1120] border border-slate-700 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed mb-4">
          {negotiationMessage}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={copyToClipboard}
            className="py-3 px-5 rounded-xl bg-[#FFB800] hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
            <span>{copied ? "Copiado para Área de Transferência!" : "Copiar Mensagem Pronta"}</span>
          </button>

          <a
            href={`https://wa.me/${selectedStudent.guardianPhone.replace(/\D/g, '')}?text=${encodeURIComponent(negotiationMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Abrir no WhatsApp Web/App</span>
          </a>
        </div>
      </div>

    </div>
  );
}
