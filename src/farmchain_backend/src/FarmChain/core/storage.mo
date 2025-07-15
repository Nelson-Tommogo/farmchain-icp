import Types "types";
import Constants "constants";

module {
    public type State = {
        var farmers: [(Principal, Types.FarmerProfile)];
        var agents: [(Principal, Types.AgentProfile)];
        var inputTokenBalances: [(Principal, Nat)];
        var outputTokenBalances: [(Principal, Nat)];
        var insuranceApplications: [Types.InsuranceApplication];
        var financeApplications: [Types.FinanceApplication];
        var proposals: [Types.Proposal];
        var nextProposalId: Nat;
        var nextInsuranceId: Nat;
        var nextFinanceId: Nat;
    };

    public func init() : State {
        {
            var farmers = [];
            var agents = [];
            var inputTokenBalances = [];
            var outputTokenBalances = [];
            var insuranceApplications = [];
            var financeApplications = [];
            var proposals = [];
            var nextProposalId = 0;
            var nextInsuranceId = 0;
            var nextFinanceId = 0;
        }
    };
};