// Inputs sheet
import { CableCTL } from './cable/cable-ctl';
import { CableManualLog } from './cable/cable-manual-log';
import { CableManualWT } from './cable/cable-manual-wt';
import { CableManualWTLog } from './cable/cable-manual-wt-log';
import { AssumptionMod, InputVarMod, IntermediateVarMod, OutputVarMod } from './frcs.model';
import { GroundCTL } from './ground/ground-ctl';
import { GroundManualLog } from './ground/ground-manual-log';
import { GroundManualWT } from './ground/ground-manual-wt';
import { GroundMechWT } from './ground/ground-mech-wt';
import { HelicopterCTL } from './helicopter/helicopter-ctl';
import { HelicopterManualWT } from './helicopter/helicopter-manual-wt';

function calculate() {
    const input: InputVarMod = { System: '', PartialCut: false, DeliverDist: 0, Slope: 0, Elevation: 0, CalcLoad: false,
                                 CalcMoveIn: false, Area: 0, MoveInDist: 0, CalcResidues: false, UserSpecWDCT: 0,
                                 UserSpecWDSLT: 0, UserSpecWDLLT: 0, UserSpecRFCT: 0, UserSpecRFSLT: 0,
                                 UserSpecRFLLT: 0, UserSpecHFCT: 0, UserSpecHFSLT: 0, UserSpecHFLLT: 0, RemovalsCT: 0,
                                 TreeVolCT: 0, RemovalsSLT: 0, TreeVolSLT: 0, RemovalsLLT: 0, TreeVolLLT: 0};
    const intermediate: IntermediateVarMod = { RemovalsST: 0, RemovalsALT: 0, Removals: 0, TreeVolST: 0,
                                               TreeVolALT: 0, TreeVol: 0, VolPerAcreCT: 0, VolPerAcreSLT: 0,
                                               VolPerAcreLLT: 0, VolPerAcreST: 0, VolPerAcreALT: 0, VolPerAcre: 0,
                                               DBHCT: 0, DBHSLT: 0, DBHLLT: 0, DBHST: 0, DBHALT: 0, DBH: 0,
                                               HeightCT: 0, HeightSLT: 0, HeightLLT: 0, HeightST: 0, HeightALT: 0,
                                               Height: 0, WoodDensityCT: 0, WoodDensitySLT: 0, WoodDensityLLT: 0,
                                               WoodDensityST: 0, WoodDensityALT: 0, WoodDensity: 0, HdwdFractionCT: 0,
                                               HdwdFractionSLT: 0, HdwdFractionLLT: 0, HdwdFractionST: 0,
                                               HdwdFractionALT: 0, HdwdFraction: 0, ButtDiamSLT: 0, ButtDiamST: 0,
                                               ButtDiam: 0, LogsPerTreeCT: 0, LogsPerTreeSLT: 0, LogsPerTreeLLT: 0,
                                               LogsPerTreeST: 0, LogsPerTreeALT: 0, LogsPerTree: 0, LogVolST: 0,
                                               LogVolALT: 0, LogVol: 0, CTLLogsPerTreeCT: 0, CTLLogsPerTree: 0,
                                               CTLLogVolCT: 0, CTLLogVol: 0, BFperCF: 0, BoleWtCT: 0, BoleWtSLT: 0,
                                               BoleWtLLT: 0, BoleWtST: 0, BoleWtALT: 0, BoleWt: 0, ResidueCT: 0,
                                               ResidueSLT: 0, ResidueLLT: 0, ResidueST: 0, ResidueALT: 0, Residue: 0,
                                               ManualMachineSizeALT: 0, ManualMachineSize: 0, MechMachineSize: 0,
                                               ChipperSize: 0, NonSelfLevelCabDummy: 0, CSlopeFB_Harv: 0,
                                               CRemovalsFB_Harv: 0, CSlopeSkidForwLoadSize: 0, CHardwoodCT: 0,
                                               CHardwoodSLT: 0, CHardwoodLLT: 0, CHardwoodST: 0, CHardwoodALT: 0,
                                               CHardwood: 0};
    const assumption: AssumptionMod = { MaxManualTreeVol: 0, MaxMechTreeVol: 0, MoistureContent: 0, LogLength: 0,
                                        LoadWeightLog: 0, LoadWeightChip: 0, CTLTrailSpacing: 0, HdwdCostPremium: 0,
                                        ResidueRecovFracWT: 0, ResidueRecovFracCTL: 0 };
    let output: OutputVarMod = { TotalPerBoleCCF: 0, TotalPerGT: 0, TotalPerAcre: 0 };

    input.System = (<HTMLSelectElement>document.getElementById('system')).value;
    input.PartialCut = (<HTMLSelectElement>document.getElementById('cut_type')).value === 'partial_cut';
    input.DeliverDist = Number((<HTMLSelectElement>document.getElementById('deliver_dist')).value);
    input.Slope = Number((<HTMLSelectElement>document.getElementById('slope')).value);
    input.Elevation = Number((<HTMLSelectElement>document.getElementById('elevation')).value);
    input.CalcLoad = (<HTMLInputElement>document.getElementById('load_cost')).checked;
    input.CalcMoveIn = (<HTMLInputElement>document.getElementById('move_in')).checked;
    input.Area = Number((<HTMLSelectElement>document.getElementById('area')).value);
    input.MoveInDist = Number((<HTMLSelectElement>document.getElementById('move_in_dist')).value);
    input.CalcResidues = (<HTMLInputElement>document.getElementById('residue_collect')).checked;
    input.UserSpecWDCT = Number((<HTMLSelectElement>document.getElementById('gwd_ct')).value);
    input.UserSpecWDSLT = Number((<HTMLSelectElement>document.getElementById('gwd_slt')).value);
    input.UserSpecWDLLT = Number((<HTMLSelectElement>document.getElementById('gwd_llt')).value);
    input.UserSpecRFCT = Number((<HTMLSelectElement>document.getElementById('rf_ct')).value);
    input.UserSpecRFSLT = Number((<HTMLSelectElement>document.getElementById('rf_slt')).value);
    input.UserSpecRFLLT = Number((<HTMLSelectElement>document.getElementById('rf_llt')).value);
    input.UserSpecHFCT = Number((<HTMLSelectElement>document.getElementById('hf_ct')).value);
    input.UserSpecHFSLT = Number((<HTMLSelectElement>document.getElementById('hf_slt')).value);
    input.UserSpecHFLLT = Number((<HTMLSelectElement>document.getElementById('hf_llt')).value);
    input.RemovalsCT = Number((<HTMLSelectElement>document.getElementById('rmct')).value);
    input.RemovalsSLT = Number((<HTMLSelectElement>document.getElementById('rmslt')).value);
    input.RemovalsLLT = Number((<HTMLSelectElement>document.getElementById('rmllt')).value);
    input.TreeVolCT = Number((<HTMLSelectElement>document.getElementById('tvct')).value);
    input.TreeVolSLT = Number((<HTMLSelectElement>document.getElementById('tvslt')).value);
    input.TreeVolLLT = Number((<HTMLSelectElement>document.getElementById('tvllt')).value);

// Other Assumptions
    assumption.MaxManualTreeVol = 150;
    assumption.MaxMechTreeVol = 80;
    assumption.MoistureContent = 0.50;
    assumption.LogLength = 32;
    assumption.LoadWeightLog = 25;
    assumption.LoadWeightChip = 25;
    assumption.CTLTrailSpacing = 50;
    assumption.HdwdCostPremium = 0.20;
    assumption.ResidueRecovFracWT = 0.80;
    assumption.ResidueRecovFracCTL = 0.50;

// funtions
    intermediate.RemovalsST = input.RemovalsCT + input.RemovalsSLT;
    intermediate.RemovalsALT = input.RemovalsSLT + input.RemovalsLLT;
    intermediate.Removals = input.RemovalsCT + input.RemovalsSLT + input.RemovalsLLT;

    intermediate.VolPerAcreCT = input.RemovalsCT * input.TreeVolCT;
    intermediate.VolPerAcreSLT = input.RemovalsSLT * input.TreeVolSLT;
    intermediate.VolPerAcreLLT = input.RemovalsLLT * input.TreeVolLLT;
    intermediate.VolPerAcreST = intermediate.VolPerAcreCT + intermediate.VolPerAcreSLT;
    intermediate.VolPerAcreALT = intermediate.VolPerAcreSLT + intermediate.VolPerAcreLLT;
    intermediate.VolPerAcre = intermediate.VolPerAcreCT + intermediate.VolPerAcreSLT + intermediate.VolPerAcreLLT;

    intermediate.TreeVolST = intermediate.RemovalsST > 0 ? intermediate.VolPerAcreST / intermediate.RemovalsST : 0;
    intermediate.TreeVolALT = intermediate.RemovalsALT > 0 ? intermediate.VolPerAcreALT / intermediate.RemovalsALT : 0;
    intermediate.TreeVol = intermediate.Removals > 0 ? intermediate.VolPerAcre / intermediate.Removals : 0;

// DBH
    intermediate.DBHCT = Math.sqrt((input.TreeVolCT + 3.675) / 0.216);
    intermediate.DBHSLT = Math.sqrt((input.TreeVolSLT + 3.675) / 0.216);
    intermediate.DBHLLT = Math.sqrt((input.TreeVolLLT + 3.675) / 0.216);
    intermediate.DBHST = intermediate.TreeVolST > 0 ? Math.sqrt((input.RemovalsCT * Math.pow(intermediate.DBHCT, 2)
        + input.RemovalsSLT * Math.pow(intermediate.DBHSLT, 2)) / intermediate.RemovalsST) : 0;
    intermediate.DBHALT = intermediate.TreeVolALT > 0 ? Math.sqrt((input.RemovalsSLT * Math.pow(intermediate.DBHSLT, 2)
        + input.RemovalsLLT * Math.pow(intermediate.DBHLLT, 2)) / intermediate.RemovalsALT) : 0;
    intermediate.DBH = Math.sqrt((input.RemovalsCT * Math.pow(intermediate.DBHCT, 2)
        + intermediate.RemovalsALT * Math.pow(intermediate.DBHALT, 2)) / intermediate.Removals);
// Tree Height
    intermediate.HeightCT = input.TreeVolCT > 0 ? -20 + 24 * Math.sqrt(intermediate.DBHCT) : 0;
    intermediate.HeightSLT = input.TreeVolSLT > 0 ? -20 + 24 * Math.sqrt(intermediate.DBHSLT) : 0;
    intermediate.HeightLLT = input.TreeVolLLT > 0 ? -20 + 24 * Math.sqrt(intermediate.DBHLLT) : 0;
    intermediate.HeightST = intermediate.TreeVolST > 0
        ? (input.RemovalsCT * intermediate.HeightCT + input.RemovalsSLT * intermediate.HeightSLT)
        / intermediate.RemovalsST : 0;
    intermediate.HeightALT = intermediate.TreeVolALT > 0 ? (input.RemovalsSLT * intermediate.HeightSLT
        + input.RemovalsLLT * intermediate.HeightLLT) / intermediate.RemovalsALT : 0;
    intermediate.Height = intermediate.TreeVol > 0 ? (input.RemovalsCT * intermediate.HeightCT
        + intermediate.RemovalsALT * intermediate.HeightALT) / intermediate.Removals : 0;
// Wood Density
    intermediate.WoodDensityCT = input.UserSpecWDCT > 0 ? input.UserSpecWDCT : 50;
    intermediate.WoodDensitySLT = input.UserSpecWDSLT > 0 ? input.UserSpecWDSLT : 50;
    intermediate.WoodDensityLLT = input.UserSpecWDLLT > 0 ? input.UserSpecWDLLT : 50;
    intermediate.WoodDensityST = intermediate.VolPerAcreST > 0 ? (intermediate.WoodDensityCT * intermediate.VolPerAcreCT
        + intermediate.WoodDensitySLT * intermediate.VolPerAcreSLT) / intermediate.VolPerAcreST : 0;
    intermediate.WoodDensityALT = intermediate.VolPerAcreALT > 0 ?
        (intermediate.WoodDensitySLT * intermediate.VolPerAcreSLT
            + intermediate.WoodDensityLLT * intermediate.VolPerAcreLLT) / intermediate.VolPerAcreALT : 0;
    intermediate.WoodDensity = (intermediate.WoodDensityCT * intermediate.VolPerAcreCT
        + intermediate.WoodDensityALT * intermediate.VolPerAcreALT) / intermediate.VolPerAcre;
// Hardwood Fraction
    intermediate.HdwdFractionCT = !isNaN(input.UserSpecHFCT) ? input.UserSpecHFCT : 0;
    intermediate.HdwdFractionSLT = !isNaN(input.UserSpecHFSLT) ? input.UserSpecHFSLT : 0;
    intermediate.HdwdFractionLLT = !isNaN(input.UserSpecHFLLT) ? input.UserSpecHFLLT : 0;
    intermediate.HdwdFractionST = intermediate.VolPerAcreST > 0 ?
        (intermediate.HdwdFractionCT * intermediate.VolPerAcreCT
        + intermediate.HdwdFractionSLT * intermediate.VolPerAcreSLT) / intermediate.VolPerAcreST : 0;
    intermediate.HdwdFractionALT = intermediate.VolPerAcreALT > 0 ?
        (intermediate.HdwdFractionSLT * intermediate.VolPerAcreSLT
        + intermediate.HdwdFractionLLT * intermediate.VolPerAcreLLT) / intermediate.VolPerAcreALT : 0;
    intermediate.HdwdFraction = (intermediate.HdwdFractionCT * intermediate.VolPerAcreCT
        + intermediate.HdwdFractionALT * intermediate.VolPerAcreALT) / intermediate.VolPerAcre;
// ButtDiam
    intermediate.ButtDiamSLT = intermediate.DBHSLT + 3;
    intermediate.ButtDiamST = intermediate.DBHST + 3;
    intermediate.ButtDiam = intermediate.DBH + 3;
// Logs Per Tree
    intermediate.LogsPerTreeCT = 1;
    intermediate.LogsPerTreeSLT = (-0.43 + 0.678 * Math.sqrt(intermediate.DBHSLT));
    intermediate.LogsPerTreeLLT = (-0.43 + 0.678 * Math.sqrt(intermediate.DBHLLT));
    intermediate.LogsPerTreeST = (intermediate.LogsPerTreeCT * input.RemovalsCT
        + intermediate.LogsPerTreeSLT * input.RemovalsSLT) / intermediate.RemovalsST;
    intermediate.LogsPerTreeALT = intermediate.RemovalsALT === 0 ? 0 : ((intermediate.LogsPerTreeSLT * input.RemovalsSLT
        + intermediate.LogsPerTreeLLT * input.RemovalsLLT) / intermediate.RemovalsALT);
    intermediate.LogsPerTree = (intermediate.LogsPerTreeCT * input.RemovalsCT
        + intermediate.LogsPerTreeALT * intermediate.RemovalsALT) / intermediate.Removals;
// Log Volume
    intermediate.LogVolST = intermediate.TreeVolST / intermediate.LogsPerTreeST;
    intermediate.LogVolALT = intermediate.RemovalsALT === 0 ? 0 : intermediate.TreeVolALT / intermediate.LogsPerTreeALT;
    intermediate.LogVol = intermediate.TreeVol / intermediate.LogsPerTree;
// CTL Logs Per Tree
    intermediate.CTLLogsPerTreeCT = Math.max(1, 2 * (-0.43 + 0.678 * Math.sqrt(intermediate.DBHCT)));
    intermediate.CTLLogsPerTree = Math.max(1, 2 * (-0.43 + 0.678 * Math.sqrt(intermediate.DBHST)));
// CTL Log Volume
    intermediate.CTLLogVolCT = input.TreeVolCT / intermediate.CTLLogsPerTreeCT;
    intermediate.CTLLogVol = intermediate.TreeVolST / intermediate.CTLLogsPerTree;
// BFperCF=5
    intermediate.BFperCF = 5;
// Bole Weight
    intermediate.BoleWtCT = intermediate.WoodDensityCT * intermediate.VolPerAcreCT / 2000;
    intermediate.BoleWtSLT = intermediate.WoodDensitySLT * intermediate.VolPerAcreSLT / 2000;
    intermediate.BoleWtLLT = intermediate.WoodDensityLLT * intermediate.VolPerAcreLLT / 2000;
    intermediate.BoleWtST = intermediate.BoleWtCT + intermediate.BoleWtSLT;
    intermediate.BoleWtALT = intermediate.BoleWtSLT + intermediate.BoleWtLLT;
    intermediate.BoleWt = intermediate.BoleWtCT + intermediate.BoleWtALT;
// Residue Weight
    intermediate.ResidueCT = input.UserSpecRFCT * intermediate.BoleWtCT;
    intermediate.ResidueSLT = input.UserSpecRFSLT * intermediate.BoleWtSLT;
    intermediate.ResidueLLT = input.UserSpecRFLLT * intermediate.BoleWtLLT;
    intermediate.ResidueST = intermediate.ResidueCT + intermediate.ResidueSLT;
    intermediate.ResidueALT = intermediate.ResidueSLT + intermediate.ResidueLLT;
    intermediate.Residue = intermediate.ResidueCT + intermediate.ResidueALT;
// Manual Machine Size
    intermediate.ManualMachineSizeALT = Math.min(1, intermediate.TreeVolALT / assumption.MaxManualTreeVol);
    intermediate.ManualMachineSize = Math.min(1, intermediate.TreeVol / assumption.MaxManualTreeVol);
// Mechanized Machine Size
    intermediate.MechMachineSize = Math.min(1, intermediate.TreeVolST / assumption.MaxMechTreeVol);
// Chipper Size
    intermediate.ChipperSize = Math.min(1, input.TreeVolCT / assumption.MaxMechTreeVol);
// NonSelfLevelCabDummy
    intermediate.NonSelfLevelCabDummy = input.Slope < 15 ? 1 : (input.Slope < 35 ? 1.75 - 0.05 * input.Slope : 0);
// Cinput.SlopeFB&Harv (Mellgren 90)
    intermediate.CSlopeFB_Harv = 0.00015 * Math.pow(input.Slope, 2)
        + 0.00359 * intermediate.NonSelfLevelCabDummy * input.Slope;
// CRemovalsFB&Harv (Mellgren 90)
    intermediate.CRemovalsFB_Harv = Math.max(0, 0.66 - 0.001193 * intermediate.RemovalsST * 2.47
        + 5.357 * Math.pow(10, -7) * Math.pow(intermediate.RemovalsST * 2.47, 2));
// Cinput.SlopeSkidForwLoadSize (Mellgren 90)
    intermediate.CSlopeSkidForwLoadSize = 1 - 0.000127 * Math.pow(input.Slope, 2);
// Chardwood
    intermediate.CHardwoodCT = 1 + assumption.HdwdCostPremium * intermediate.HdwdFractionCT;
    intermediate.CHardwoodSLT = 1 + assumption.HdwdCostPremium * intermediate.HdwdFractionSLT;
    intermediate.CHardwoodLLT = 1 + assumption.HdwdCostPremium * intermediate.HdwdFractionLLT;
    intermediate.CHardwoodST = 1 + assumption.HdwdCostPremium * intermediate.HdwdFractionST;
    intermediate.CHardwoodALT = 1 + assumption.HdwdCostPremium * intermediate.HdwdFractionALT;
    intermediate.CHardwood = 1 + assumption.HdwdCostPremium * intermediate.HdwdFraction;

    switch (input.System) {
        case 'Ground-Based Mech WT':
            output = GroundMechWT(input, intermediate, assumption);
            break;
        case 'Ground-Based Manual WT':
            output = GroundManualWT(input, intermediate, assumption);
            break;
        case 'Ground-Based Manual Log': // CalcResidues must be 0
            output = GroundManualLog(input, intermediate, assumption);
            break;
        case 'Ground-Based CTL':
            output = GroundCTL(input, intermediate, assumption);
            break;
        case 'Cable Manual WT/Log':
            output = CableManualWTLog(input, intermediate, assumption);
            break;
        case 'Cable Manual WT':
            output = CableManualWT(input, intermediate, assumption);
            break;
        case 'Cable Manual Log':
            output = CableManualLog(input, intermediate, assumption);
            break;
        case 'Cable CTL':
            output = CableCTL(input, intermediate, assumption);
            break;
        case 'Helicopter Manual WT':
            output = HelicopterManualWT(input, intermediate, assumption);
            break;
        case 'Helicopter CTL':
            output = HelicopterCTL(input, intermediate, assumption);
            break;
    }

    (<HTMLSelectElement>document.getElementById('CCF')).textContent = String(output.TotalPerBoleCCF);
    (<HTMLSelectElement>document.getElementById('Ton')).textContent = String(output.TotalPerGT);
    (<HTMLSelectElement>document.getElementById('Acre')).textContent = String(output.TotalPerAcre);

}