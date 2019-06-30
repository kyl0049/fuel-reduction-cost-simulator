// FellLargeLogTrees sheet
import { CostMachineMod } from './frcs.model';

function FellLargeLogTrees(Slope: number, RemovalsLLT: number, TreeVolLLT: number, TreeVol: number, PartialCut: boolean,
                           DBHLLT: number, LogsPerTreeLLT: number, CHardwoodLLT: number, CostMachine: CostMachineMod) {
const WalkDistLLT = Math.sqrt(43560 / Math.max(RemovalsLLT, 1));
const PMH_Chainsaw = CostMachine.PMH_Chainsaw;
// I. Felling Only
// IA (McNeel, 94)
const SelectionTimePerTreelltA = 0.568 + 0.0193 * 0.305 * WalkDistLLT + 0.0294 * 2.54 * DBHLLT;
const ClearcutTimePerTreelltA = 0.163 + 0.0444 * 0.305 * WalkDistLLT + 0.0323 * 2.54 * DBHLLT;
const TimePerTreelltA = (PartialCut ?
    SelectionTimePerTreelltA : Math.min(SelectionTimePerTreelltA, ClearcutTimePerTreelltA));
const VolPerPMHlltA = TreeVolLLT / (TimePerTreelltA / 60);
const CostPerCCFlltA = 100 * PMH_Chainsaw / VolPerPMHlltA;
const RelevancelltA = 1;
// IB (Peterson, 87)
const TimePerTreelltB = (DBHLLT < 10 ? 0.33 + 0.012 * DBHLLT : 0.1 + 0.0111 * Math.pow(DBHLLT, 1.496));
const VolPerPMHlltB = TreeVolLLT / (TimePerTreelltB / 60);
const CostPerCCFlltB = 100 * PMH_Chainsaw / VolPerPMHlltB;
const RelevancelltB = 1;
// IC (Keatley, 2000)
const TimePerTreelltC = Math.sqrt(4.58 + 0.07 * WalkDistLLT + 0.16 * DBHLLT);
const VolPerPMHlltC = TreeVolLLT / (TimePerTreelltC / 60);
const CostPerCCFlltC = 100 * PMH_Chainsaw / VolPerPMHlltC;
const RelevancelltC = 1;
// ID (Andersson, B. and G. Young, 98. Harvesting coastal second growth forests:
// summary of harvesting system performance.  FERIC Technical Report TR-120)
const TimePerTreelltD = 1.082 + 0.01505 * TreeVolLLT - 0.634 / TreeVolLLT;
const VolPerPMHlltD = TreeVolLLT / (TimePerTreelltD / 60);
const CostPerCCFlltD = 100 * PMH_Chainsaw / VolPerPMHlltD;
const RelevancelltD = TreeVolLLT < 5 ? 0 : (TreeVolLLT < 15 ? -0.5 + TreeVolLLT / 10
: (TreeVolLLT < 90 ? 1 : (TreeVolLLT < 180 ? 2 - TreeVolLLT / 90 : 0)));
// IE User-Defined Felling Only
const VolPerPMHlltE = 0.001;
const CostPerCCFlltE = 100 * PMH_Chainsaw / VolPerPMHlltE;
const RelevancelltE = 0;
// Summary
const CostManFellLLT = (TreeVolLLT > 0 ? CHardwoodLLT * 100 *
(PMH_Chainsaw * RelevancelltA + PMH_Chainsaw * RelevancelltB
+ PMH_Chainsaw * RelevancelltC + PMH_Chainsaw * RelevancelltD + PMH_Chainsaw * RelevancelltE)
/ (RelevancelltA * VolPerPMHlltA + RelevancelltB * VolPerPMHlltB
+ RelevancelltC * VolPerPMHlltC + RelevancelltD * VolPerPMHlltD + RelevancelltE * VolPerPMHlltE) : 0);

// II. Felling, Limbing & Bucking
// IIA (Kellogg&Olsen, 86)
const EastsideAdjustment = 1.2;
const ClearcutAdjustment = 0.9;
const TimePerTreelltIIA = EastsideAdjustment * (PartialCut ?
1 : (!PartialCut ? ClearcutAdjustment : 0))
* (1.33 + 0.0187 * WalkDistLLT + 0.0143 * Slope + 0.0987 * TreeVolLLT + 0.14);
const VolPerPMHlltIIA = TreeVolLLT / (TimePerTreelltIIA / 60);
const CostPerCCFlltIIA = 100 * PMH_Chainsaw / VolPerPMHlltIIA;
const RelevancelltIIA = 1;
// IIB (Kellogg, L., M. Miller and E. Olsen, 1999)
// Skyline thinning production and costs: experience from the Willamette Young Stand Project.
// Research Contribtion 21.  Forest Research Laboratory, Oregon State University, Corvallis.
const LimbslltIIB = 31.5;
const LogslltIIB = LogsPerTreeLLT;
const WedgelltIIB = 0.02;
const CorridorlltIIB = 0.21;
const NotBetweenOpeningslltIIB = 1;
const OpeningslltIIB = 0;
const HeavyThinlltIIB = (PartialCut ? 0 : 1);
const DelayFraclltIIB = 0.25;
const TimePerTreelltIIB = (-0.465 + 0.102 * DBHLLT + 0.016 * LimbslltIIB
+ 0.562 * LogslltIIB + 0.009 * Slope + 0.734 * WedgelltIIB + 0.137 * CorridorlltIIB
+ 0.449 * NotBetweenOpeningslltIIB + 0.437 * OpeningslltIIB + 0.426 * HeavyThinlltIIB) * (1 + DelayFraclltIIB);
const VolPerPMHlltIIB = TreeVolLLT / (TimePerTreelltIIB / 60);
const CostPerCCFlltIIB = 100 * PMH_Chainsaw / VolPerPMHlltIIB;
// RelevancelltIIB=(TreeVolLLT<1?0:(TreeVolLLT<2?-1+TreeVolLLT/1:(TreeVolLLT<70?1:1.2-TreeVolLLT/350)));
const RelevancelltIIB = TreeVol < 1 ?
0 : (TreeVol < 2 ? -1 + TreeVol / 1 : (TreeVol < 70 ? 1 : 1.2 - TreeVol / 350)); // ='Felling (all trees)'!E40
// IIC (Andersson, B. and G. Young, 98. Harvesting coastal second growth forests:
// summary of harvesting system performance.  FERIC Technical Report TR-120)
const DelayFraclltIIC = 0.197;
const TimePerTreelltIIC = (1.772 + 0.02877 * TreeVolLLT - 2.6486 / TreeVolLLT) * (1 + DelayFraclltIIC);
const VolPerPMHlltIIC = TreeVolLLT / (TimePerTreelltIIC / 60);
const CostPerCCFlltIIC = 100 * PMH_Chainsaw / VolPerPMHlltIIC;
const RelevancelltIIC = (TreeVolLLT < 5 ? 0 : (TreeVolLLT < 15 ? -0.5 + TreeVolLLT / 10 : 1));
// IID User-Defined Felling, Limbing & Bucking
const VolPerPMHlltIID = 0.001;
const CostPerCCFlltIID = 100 * PMH_Chainsaw / VolPerPMHlltIID;
const RelevancelltIID = 0;
// Summary
const CostManFLBLLT = (TreeVolLLT > 0 ? CHardwoodLLT * 100 *
(PMH_Chainsaw * RelevancelltIIA + PMH_Chainsaw * RelevancelltIIB
+ PMH_Chainsaw * RelevancelltIIC + PMH_Chainsaw * RelevancelltIID)
/ (RelevancelltIIA * VolPerPMHlltIIA + RelevancelltIIB * VolPerPMHlltIIB
+ RelevancelltIIC * VolPerPMHlltIIC + RelevancelltIID * VolPerPMHlltIID) : 0);

return CostManFLBLLT;
}

export { FellLargeLogTrees };
