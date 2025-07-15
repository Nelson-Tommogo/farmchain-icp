import Types "../core/types";
import Storage "../core/storage";
import Array "mo:base/Array";

shared actor class Farmer() = this {
    let state = Storage.init();

    // Get farmer profile
    public shared query ({ caller }) func getProfile() : async ?Types.FarmerProfile {
        switch (Array.find(state.farmers, func ((id, profile) : (Principal, Types.FarmerProfile)) : Bool {
            id == caller
        })) {
            case (null) null;
            case (?(_, profile)) ?profile;
        }
    };

    // Apply for finance
    public shared ({ caller }) func applyFinance(amount: Nat, purpose: Text) : async Types.FinanceApplication {
        let newApplication : Types.FinanceApplication = {
            id = state.nextFinanceId;
            farmerId = caller;
            amount;
            purpose;
            status = #pending;
            votesFor = 0;
            votesAgainst = 0;
            voters = [];
        };
        state.financeApplications := Array.append(state.financeApplications, [newApplication]);
        state.nextFinanceId += 1;
        newApplication
    };

    // Check finance application status
    public shared query ({ caller }) func checkFinanceStatus(applicationId: Nat) : async ?Types.FinanceApplication {
        Array.find(state.financeApplications, func (app: Types.FinanceApplication) : Bool = 
            app.id == applicationId and app.farmerId == caller)
    };
};