import Types "../core/types";
import Storage "../core/storage";
import Utils "../core/utils";
import Array "mo:base/Array";

shared actor class Investor() = this {
    let state = Storage.init();

    // Invest in the DAO (receive voting tokens)
    public shared ({ caller }) func invest(amount: Nat) : async Bool {
        assert amount > 0;
        
        // In a real implementation, this would involve actual token transfer
        state.inputTokenBalances := Array.append(state.inputTokenBalances, [(caller, amount)]);
        true
    };

    // Get investment balance
    public shared query ({ caller }) func getInvestmentBalance() : async Nat {
        switch (Utils.find(state.inputTokenBalances, func ((id, _) : (Principal, Nat)) : Bool { id == caller })) {
            case (? (_, balance)) { balance };
            case null { 0 };
        }
    };

    // List all active finance applications
    public shared query func listFinanceApplications() : async [Types.FinanceApplication] {
        Array.filter(state.financeApplications, func (app: Types.FinanceApplication) : Bool = 
            app.status == #voting or app.status == #pending)
    };
};