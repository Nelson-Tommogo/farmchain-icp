import Types "../core/types";
import Storage "../core/storage";
import Time "mo:base/Time";
import Array "mo:base/Array";

shared actor class Insurance() = this {
    let state = Storage.init();

    // Apply for insurance
    public shared ({ caller }) func applyInsurance(cropType: Text, coverageAmount: Nat) : async Types.InsuranceApplication {
        let newApplication : Types.InsuranceApplication = {
            id = state.nextInsuranceId;
            farmerId = caller;
            cropType;
            coverageAmount;
            status = #pending;
            appliedDate = Time.now();
        };
        state.insuranceApplications := Array.append(state.insuranceApplications, [newApplication]);
        state.nextInsuranceId += 1;
        newApplication
    };

    // Approve insurance application (DAO only)
    public shared ({ caller }) func approveInsurance(applicationId: Nat) : async Bool {
        switch (Array.find(state.insuranceApplications, func (a: Types.InsuranceApplication) : Bool = a.id == applicationId)) {
            case (?app) {
                let updatedApp = { app with status = #approved };
                state.insuranceApplications := Array.map(state.insuranceApplications, 
                    func (a: Types.InsuranceApplication) : Types.InsuranceApplication = 
                        if (a.id == applicationId) updatedApp else a);
                true
            };
            case null { false }
        }
    };

    // Claim insurance payout
    public shared ({ caller }) func claimInsurance(applicationId: Nat) : async Bool {
        switch (Array.find(state.insuranceApplications, func (a: Types.InsuranceApplication) : Bool = 
            a.id == applicationId and a.farmerId == caller and a.status == #approved)) {
            case (?app) {
                // Process payout logic would go here
                true
            };
            case null { false }
        }
    };
};