// Outputs sheet: Cable Manual WT column
import { Chipping } from '../chipping';
import { AssumptionMod, InputVarMod, IntermediateVarMod, MachineCostMod } from '../frcs.model';
import { FellwtSmallLogOther } from '../ground/fellwtsmalllogother';
import { InLimits } from '../inlimits';
import { Loading } from '../loading';
import { MachineCosts } from '../machinecosts';
import { MoveInCosts } from '../moveincost';
import { Processing } from '../processing';
import { CYCCU } from './cyccu';
import { CYPCU } from './cypcu';

function CableManualWT(input: InputVarMod, intermediate: IntermediateVarMod, assumption: AssumptionMod) {
// ----System Product Summary--------------
    // Amounts Recovered Per Acre
    const BoleVolCCF = intermediate.VolPerAcre / 100;
    const ResidueRecoveredPrimary = assumption.ResidueRecovFracWT * intermediate.ResidueCT;
    const PrimaryProduct = intermediate.BoleWt + ResidueRecoveredPrimary;
    const ResidueRecoveredOptional = input.CalcResidues ?
        (assumption.ResidueRecovFracWT * intermediate.ResidueSLT)
        + (assumption.ResidueRecovFracWT * intermediate.ResidueLLT) : 0;
    const TotalPrimaryProductsAndOptionalResidues = PrimaryProduct + ResidueRecoveredOptional;

// Limits
    const InLimits1 = InLimits(input, intermediate);
// Machine costs
    const machineCost: MachineCostMod = MachineCosts();
// System Cost Elements-------
    const FellwtSmallLogOtherResults = FellwtSmallLogOther(input, intermediate, machineCost);
    const CostManFLBLLT2 = FellwtSmallLogOtherResults.CostManFLBLLT2;
    const CostManFellST2 = FellwtSmallLogOtherResults.CostManFellST2;
    const CostYardPCUB = CYPCU(assumption, input, intermediate, machineCost);
    const CostYardCCUB = CYCCU(input, intermediate, machineCost);
    const CostProcess = Processing(input, intermediate, machineCost);
    const LoadingResults = Loading(assumption, input, intermediate, machineCost);
    const CostLoad = LoadingResults.CostLoad;
    const ChippingResults = Chipping(assumption, input, intermediate, machineCost);
    const CostChipWT = ChippingResults.CostChipWT;
    const MoveInCostsResults = MoveInCosts(input, intermediate, machineCost);
    const CostChipLooseRes = ChippingResults.CostChipLooseRes;

    // C. For All Products, $/ac
    const ManualFellLimbBuckTreesLarger80cf = CostManFLBLLT2 * intermediate.VolPerAcreLLT / 100 * InLimits1;
    const ManualFellTreesLess80cf = CostManFellST2 * intermediate.VolPerAcreST / 100 * InLimits1;
    const YardUnbunchedAllTrees = (input.cut_type === true ?
        CostYardPCUB : (input.cut_type === false ? CostYardCCUB : 0)) * intermediate.VolPerAcre / 100 * InLimits1;
    const ProcessLogTreesLess80cf = CostProcess * intermediate.VolPerAcreSLT / 100 * InLimits1;
    const LoadLogTrees = CostLoad * intermediate.VolPerAcreALT / 100 * InLimits1;
    const ChipWholeTrees = CostChipWT * intermediate.VolPerAcreCT / 100 * InLimits1;

    const Stump2Truck4PrimaryProductWithoutMovein = ManualFellLimbBuckTreesLarger80cf
        + ManualFellTreesLess80cf + YardUnbunchedAllTrees + ProcessLogTreesLess80cf + LoadLogTrees + ChipWholeTrees;
    const Movein4PrimaryProduct = input.CalcMoveIn ?
        MoveInCostsResults.CostPerCCFcableManualWT * BoleVolCCF * InLimits1 : 0;

    const ChipLooseResiduesFromLogTreesLess80cf = input.CalcResidues ?
        CostChipLooseRes * ResidueRecoveredOptional * InLimits1 : 0;
    const OntoTruck4ResiduesWoMovein = ChipLooseResiduesFromLogTreesLess80cf;
    const  Movein4Residues = (input.CalcMoveIn && input.CalcResidues) ?
        0 * ResidueRecoveredOptional * InLimits1 : 0;

// III. System Cost Summaries
    const TotalPerAcre = Math.round(Stump2Truck4PrimaryProductWithoutMovein + Movein4PrimaryProduct
        + OntoTruck4ResiduesWoMovein + Movein4Residues);
    const TotalPerBoleCCF = Math.round(TotalPerAcre / BoleVolCCF);
    const TotalPerGT = Math.round(TotalPerAcre / TotalPrimaryProductsAndOptionalResidues);

    return { 'TotalPerBoleCCF': TotalPerBoleCCF, 'TotalPerGT': TotalPerGT, 'TotalPerAcre': TotalPerAcre };
}

export { CableManualWT };
