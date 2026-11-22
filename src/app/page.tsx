"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  UserX, 
  Play, 
  ArrowRight,
  TrendingDown,
  Smartphone,
  Car,
  Bell
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"driver" | "parent" | "report">("driver");
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(true);
  const [parentStatus, setParentStatus] = useState<"idle" | "descendo" | "ausente">("idle");

  // Timer simulation
  useEffect(() => {
    let interval: any;
    if (timerRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, countdown]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col font-sans">
      {/* Header / Navbar */}
      <header className="border-b border-[#1E293B] bg-[#0B1120]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Mark */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-6 h-6 border-2 border-slate-900 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-900 rounded-full" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">
                No<span className="text-[#FFB800]">Portão</span>
              </span>
              <span className="hidden sm:inline-block ml-3 text-xs uppercase tracking-widest text-slate-400 font-semibold border-l border-slate-700 pl-3">
                SaaS de Pontualidade Escolar
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-[#FFB800] border border-amber-400/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Sistema Ativo
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium mb-6">
          <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
          <span>Fim da espera no ponto e da culpa injusta no transporte escolar</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
          A van chega no horário. <br />
          <span className="text-[#FFB800]">A criança já está no portão.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Alertas automáticos de 10 e 5 minutos, confirmação com 1 toque no WhatsApp, cronômetro contratual de tolerância e relatório irrefutável de atrasos.
        </p>

        {/* Interactive Mode Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#161F30] border border-[#233044] mb-8">
          <button
            onClick={() => setActiveTab("driver")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "driver"
                ? "bg-[#FFB800] text-slate-950 shadow-lg shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Car className="w-4 h-4" />
            Painel do Motorista (Hands-Free)
          </button>
          <button
            onClick={() => setActiveTab("parent")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "parent"
                ? "bg-[#FFB800] text-slate-950 shadow-lg shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Visão da Família (WhatsApp/PWA)
          </button>
          <button
            onClick={() => setActiveTab("report")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "report"
                ? "bg-[#FFB800] text-slate-950 shadow-lg shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            Relatório de Pontualidade
          </button>
        </div>

        {/* SIMULATOR WINDOW */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#161F30] border border-[#233044] p-6 sm:p-8 text-left shadow-2xl">
          
          {/* TAB 1: PAINEL DO MOTORISTA */}
          {activeTab === "driver" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60 mb-6">
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Rota Ativa • Manhã (Ida)
                  </div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    Próximo Ponto: Casa do Pedro
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FFB800]" />
                    <span className="text-sm font-semibold">Rua das Acácias, 142</span>
                  </div>
                </div>
              </div>

              {/* Status de Parada com Cronômetro */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Cronômetro de Espera */}
                <div className="p-6 rounded-2xl bg-[#0B1120] border-2 border-red-500/40 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-red-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> Tolerância de Espera
                    </span>
                    <span>Contrato: 3 min</span>
                  </div>
                  <div className="text-5xl font-black text-white tracking-tight mb-2">
                    {formatTimer(countdown)}
                  </div>
                  <p className="text-xs text-slate-400">
                    {countdown > 0 
                      ? "Aguardando no portão com telemetria GPS gravando." 
                      : "Tempo limite esgotado! Registro documentado."}
                  </p>
                </div>

                {/* Status da Família */}
                <div className="p-6 rounded-2xl bg-[#0B1120] border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-400 mb-2">
                      Confirmação da Família
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                      <CheckCircle2 className="w-5 h-5" />
                      "Tô descendo!" (07:12:04)
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Responsável confirmou pelo WhatsApp ao receber o alerta de 5 minutos.
                    </p>
                  </div>
                </div>

                {/* Ação do Motorista */}
                <div className="p-6 rounded-2xl bg-[#0B1120] border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-400 mb-2">
                      Ação no Painel (Mãos-Livres)
                    </div>
                    <p className="text-xs text-slate-300 mb-4">
                      O app detecta arrancada (&gt; 15 km/h) sozinho, ou toque no botão gigante:
                    </p>
                  </div>
                  <button 
                    onClick={() => setCountdown(180)}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-black text-slate-950 text-sm flex items-center justify-center gap-2 transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-slate-950" />
                    Aluno Embarcou (Seguir)
                  </button>
                </div>
              </div>

              {/* Próximas Paradas */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Fila da Rota
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold">1</span>
                    <span className="font-semibold">Pedro Henrique</span>
                    <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">No Ponto Agora</span>
                  </div>
                  <span className="text-xs text-slate-400">Tolerância em andamento</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-sm opacity-80">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold">2</span>
                    <span className="font-semibold">Mariana Souza</span>
                    <span className="text-xs text-blue-400 font-bold bg-blue-400/10 px-2 py-0.5 rounded">Alerta 5 min enviado</span>
                  </div>
                  <span className="text-xs text-slate-400">Previsão: 07:18</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/30 border border-slate-800 text-sm opacity-50 line-through">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold">3</span>
                    <span>Lucas Gabriel</span>
                    <span className="text-xs text-red-400 font-bold bg-red-400/10 px-2 py-0.5 rounded no-underline">Avisou: Não vai hoje</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold no-underline">+11 min economizados</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISÃO DA FAMÍLIA (WHATSAPP) */}
          {activeTab === "parent" && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFB800]">
                  Experiência Sem Baixar App Pesado
                </span>
                <h3 className="text-xl font-bold mt-1">Notificação no WhatsApp / Web</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Os pais interagem em 1 clique sem precisar criar senha ou abrir aplicativo.
                </p>
              </div>

              {/* Mockup Balão de Conversa WhatsApp */}
              <div className="bg-[#1F2C34] rounded-2xl p-5 border border-slate-700 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-black text-xs">
                    NP
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">NoPortão • Tio Carlos</div>
                    <div className="text-[10px] text-slate-400">Mensagem do Transporte Escolar</div>
                  </div>
                </div>

                <div className="bg-[#2A3942] rounded-xl p-4 text-sm text-slate-200 space-y-2 mb-4">
                  <p>
                    🚨 <strong>Tio Carlos está a 5 minutos!</strong>
                  </p>
                  <p className="text-xs text-slate-300">
                    Por favor, posicione o <strong>Pedro</strong> no portão com a mochila pronta.
                  </p>
                  <p className="text-[11px] text-amber-400 font-semibold">
                    ⏳ Tolerância de espera contratual: 3 minutos.
                  </p>
                </div>

                {/* Botões de Ação */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setParentStatus("descendo")}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                      parentStatus === "descendo"
                        ? "bg-emerald-500 text-slate-950 ring-2 ring-emerald-300"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {parentStatus === "descendo" ? "Confirmado: Tô descendo!" : "Confirmar: Tô descendo!"}
                  </button>

                  <button 
                    onClick={() => setParentStatus("ausente")}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition ${
                      parentStatus === "ausente"
                        ? "bg-red-500 text-white ring-2 ring-red-300"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    }`}
                  >
                    <UserX className="w-4 h-4" />
                    {parentStatus === "ausente" ? "Aviso enviado: Pedro não vai hoje" : "Pedro não vai hoje"}
                  </button>
                </div>

                {parentStatus !== "idle" && (
                  <p className="text-center text-[11px] text-slate-400 mt-3 animate-fade-in">
                    ✅ O painel da van foi atualizado em tempo real.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: RELATÓRIO DE PONTUALIDADE */}
          {activeTab === "report" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Relatório Mensal Irrefutável
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Histórico de Pontualidade por Ponto
                  </h3>
                </div>
                <div className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                  Período: <strong>Novembro / 2026</strong>
                </div>
              </div>

              {/* Tabela de Telemetria */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-xs font-bold text-slate-400 uppercase">
                      <th className="py-3 px-4">Aluno</th>
                      <th className="py-3 px-4">Pontualidade</th>
                      <th className="py-3 px-4">Tempo Médio de Espera</th>
                      <th className="py-3 px-4">Atrasos &gt; 3min</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">Mariana Souza</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">98%</td>
                      <td className="py-3 px-4 text-slate-300">1m 10s</td>
                      <td className="py-3 px-4 text-slate-300">0 vezes</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Exemplar
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">Lucas Gabriel</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">94%</td>
                      <td className="py-3 px-4 text-slate-300">1m 45s</td>
                      <td className="py-3 px-4 text-slate-300">1 vez</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Pontual
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-red-500/5">
                      <td className="py-3 px-4 font-bold text-white">Pedro Henrique</td>
                      <td className="py-3 px-4 text-red-400 font-bold">52%</td>
                      <td className="py-3 px-4 text-red-300 font-bold">6m 20s</td>
                      <td className="py-3 px-4 text-red-400 font-bold">9 vezes</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                          Gera Atraso
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Caixa de Argumentação / Justiça */}
              <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                <div>
                  <strong>Argumento pronto para negociação com a família:</strong>
                  <p className="mt-1 text-slate-300">
                    "Dona Márcia, neste mês o Pedro gerou 57 minutos de espera acumulada no portão (média de 6m20s por parada). Isso atrasou a rota inteira em 9 dias. Podemos adiantar o horário do ponto dele em 10 minutos para proteger a chegada das outras crianças?"
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1E293B] py-8 text-center text-xs text-slate-500">
        <p>© 2026 NoPortão — Desenvolvido para vans escolares e veículos independentes.</p>
      </footer>
    </div>
  );
}
