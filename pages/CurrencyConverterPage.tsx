import React, { useEffect, useMemo, useState } from 'react';
import { fxApi } from '../services/api';

const currencies = [
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'Ks' },
];

const CurrencyConverterPage: React.FC = () => {
  const [from, setFrom] = useState('THB');
  const [to, setTo] = useState('MMK');
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState<number | null>(null);
  const [tiers, setTiers] = useState<{buyBelow1mPer100k?: number; buyAbove1mPer100k?: number; sellBelow1mPer100k?: number; sellAbove1mPer100k?: number;} | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    fxApi.latest(from, to).then((r)=>{ if(r){ setRate(r.sellRate || r.buyRate || null); setTiers({ buyBelow1mPer100k: r.buyBelow1mPer100k, buyAbove1mPer100k: r.buyAbove1mPer100k, sellBelow1mPer100k: r.sellBelow1mPer100k, sellAbove1mPer100k: r.sellAbove1mPer100k }); setUpdatedAt(r.updatedAt || r.parsedAt || null);} }).catch(()=>{});
  }, [from, to]);

  const converted = useMemo(() => {
    if (!tiers) return null;
    // Amount entered is in FROM currency.
    if (from === 'THB' && to === 'MMK') {
      // Selling baht -> use sell tiers (MMK per 100k MMK is a baht count). Convert: THB -> MMK
      const mmkPerThb = (amtThb) => {
        // Use tier: below/above based on MMK result; approximate by first guessing
        const per100k = amtThb * 100000; // placeholder not used directly
        const rateBelow = tiers.sellBelow1mPer100k || rate || 0;
        const rateAbove = tiers.sellAbove1mPer100k || rate || 0;
        // Convert: per 100k MMK equals X THB -> 1 MMK = X/100000 THB -> 1 THB = 100000/X MMK
        const mmkPerThbBelow = rateBelow ? (100000 / rateBelow) : 0;
        const mmkPerThbAbove = rateAbove ? (100000 / rateAbove) : mmkPerThbBelow;
        // Choose tier based on resulting MMK amount threshold of 1,000,000 MMK
        const mmkIfBelow = amtThb * mmkPerThbBelow;
        if (mmkIfBelow <= 1000000) return mmkIfBelow;
        return amtThb * mmkPerThbAbove;
      };
      return mmkPerThb(amount);
    } else {
      // Buying baht -> use buy tiers. Convert MMK -> THB
      const thbPerMmk = (mmk) => {
        const rateBelow = tiers.buyBelow1mPer100k || rate || 0;
        const rateAbove = tiers.buyAbove1mPer100k || rate || 0;
        const per100kBlocks = mmk / 100000;
        const useAbove = mmk > 1000000;
        const per100k = useAbove ? rateAbove : rateBelow;
        return per100kBlocks * per100k;
      };
      return thbPerMmk(amount);
    }
  }, [amount, tiers, rate, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="text-sm text-gray-400">From</label>
            <select value={from} onChange={(e)=>setFrom(e.target.value)} className="w-full bg-gray-800 mt-1 px-3 py-2 rounded">
              {currencies.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400">To</label>
            <select value={to} onChange={(e)=>setTo(e.target.value)} className="w-full bg-gray-800 mt-1 px-3 py-2 rounded">
              {currencies.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <button onClick={swap} className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-semibold">⇄</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded px-3 py-3 flex items-center">
            <span className="mr-2">{currencies.find(c=>c.code===from)?.symbol || ''}</span>
            <input type="number" value={amount} onChange={(e)=>setAmount(parseFloat(e.target.value)||0)} className="bg-transparent flex-1 outline-none" />
          </div>
          <div className="bg-gray-800 rounded px-3 py-3 flex items-center justify-between">
            <div>{converted != null ? converted.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'}</div>
            <div>{currencies.find(c=>c.code===to)?.symbol || ''}</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-4">
          {rate ? (
            <span>Tiered pricing • Updated {updatedAt ? new Date(updatedAt).toLocaleString() : '—'} — Buy ≤1M:{tiers?.buyBelow1mPer100k ?? '-'} per 100k • Buy &gt;1M:{tiers?.buyAbove1mPer100k ?? '-'} • Sell ≤1M:{tiers?.sellBelow1mPer100k ?? '-'} • Sell &gt;1M:{tiers?.sellAbove1mPer100k ?? '-'}</span>
          ) : (
            <span>No recent rate found. Ask admin to add one.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;


