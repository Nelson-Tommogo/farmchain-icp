import Types "../core/types";
import Storage "../core/storage";
import Array "mo:base/Array";
import Time "mo:base/Time";

shared actor class Auth() = this {
    let state = Storage.init();

    // Register a new farmer
    public shared ({ caller }) func registerFarmer(name: Text, location: Text, farmSize: Float) : async Types.FarmerProfile {
        let newFarmer : Types.FarmerProfile = {
            id = caller;
            name;
            location;
            farmSize;
            verified = false;
            joined = Time.now();
        };
        state.farmers := Array.append(state.farmers, [(caller, newFarmer)]);
        newFarmer
    };

    // Register a new agent
    public shared ({ caller }) func registerAgent(name: Text, location: Text) : async Types.AgentProfile {
        let newAgent : Types.AgentProfile = {
            id = caller;
            name;
            location;
            verified = false;
            inputTokenBalance = 0;
        };
        state.agents := Array.append(state.agents, [(caller, newAgent)]);
        newAgent
    };

    // Verify a farmer (only callable by DAO)
    public shared ({ caller }) func verifyFarmer(farmerId: Principal) : async Bool {
        // DAO verification logic would go here
        // For now, just mark as verified
        switch (Array.find(state.farmers, func ((id, _) : (Principal, Types.FarmerProfile)) : Bool = id == farmerId)) {
            case (? (_, farmer)) {
                let updatedFarmer = { farmer with verified = true };
                state.farmers := Array.map<(Principal, Types.FarmerProfile), (Principal, Types.FarmerProfile)>(
                    state.farmers, 
                    func ((id, f) : (Principal, Types.FarmerProfile)) : (Principal, Types.FarmerProfile) {
                        if (id == farmerId) (id, updatedFarmer) else (id, f)
                    }
                );
                true
            };
            case null { false };
        }
    };
};