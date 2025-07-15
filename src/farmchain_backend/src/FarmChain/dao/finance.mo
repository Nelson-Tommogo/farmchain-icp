import Types "../core/types";
import Storage "../core/storage";
import Utils "../core/utils";
import Constants "../core/constants";
import Array "mo:base/Array";

shared actor class Finance() = this {
    let state = Storage.init();

    // Apply for financing
    public shared ({ caller }) func applyForFinance(amount: Nat, purpose: Text) : async Types.FinanceApplication {
        assert amount > 0;
        
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

    // Vote on a finance application
    public shared ({ caller }) func voteOnFinance(applicationId: Nat, support: Bool) : async Bool {
        switch (Utils.find(state.financeApplications, func (app: Types.FinanceApplication) : Bool = app.id == applicationId)) {
            case (?app) {
                if (app.status != #voting) { return false };
                if (Utils.find(app.voters, func (v: Principal) : Bool = v == caller) != null) { return false };
                
                let updatedApp = if (support) {
                    { app with 
                        votesFor = app.votesFor + 1;
                        voters = Array.append(app.voters, [caller]);
                    }
                } else {
                    { app with 
                        votesAgainst = app.votesAgainst + 1;
                        voters = Array.append(app.voters, [caller]);
                    }
                };
                
                state.financeApplications := Array.map(state.financeApplications, 
                    func (a: Types.FinanceApplication) : Types.FinanceApplication = 
                        if (a.id == applicationId) updatedApp else a);
                
                // Check if voting is complete
                if (updatedApp.votesFor + updatedApp.votesAgainst >= Constants.DAO_PROPOSAL_THRESHOLD) {
                    let finalStatus = if (updatedApp.votesFor > updatedApp.votesAgainst) #approved else #rejected;
                    let finalizedApp = { updatedApp with status = finalStatus };
                    state.financeApplications := Array.map(state.financeApplications, 
                        func (a: Types.FinanceApplication) : Types.FinanceApplication = 
                            if (a.id == applicationId) finalizedApp else a);
                };
                
                true
            };
            case null { false };
        }
    };

    // Get finance application details
    public shared query func getFinanceApplication(id: Nat) : async ?Types.FinanceApplication {
        Utils.find(state.financeApplications, func (app: Types.FinanceApplication) : Bool = app.id == id)
    };
};