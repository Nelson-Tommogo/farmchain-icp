import Types "../core/types";
import Storage "../core/storage";
import Array "mo:base/Array";

shared actor class Agent() = this {
    let state = Storage.init();

    // Get agent profile
    public shared query ({ caller }) func getProfile() : async ?Types.AgentProfile {
        switch (Array.find<(Principal, Types.AgentProfile)>(
            state.agents, 
            func ((id, _) : (Principal, Types.AgentProfile)) : Bool { id == caller }
        )) {
            case (?(_, profile)) { ?profile };
            case null { null }
        }
    };

    // Distribute input tokens to farmer
    public shared ({ caller }) func distributeInputTokens(farmer: Principal, amount: Nat) : async Bool {
        switch (Array.find<(Principal, Nat)>(
            state.inputTokenBalances, 
            func ((id, _) : (Principal, Nat)) : Bool { id == caller }
        )) {
            case (? (_, balance)) {
                if (balance >= amount) {
                    // Deduct from agent
                    state.inputTokenBalances := Array.map<(Principal, Nat), (Principal, Nat)>(
                        state.inputTokenBalances,
                        func ((id, bal) : (Principal, Nat)) : (Principal, Nat) {
                            if (id == caller) {
                                if (bal >= amount) {
                                    (id, bal - amount)
                                } else {
                                    (id, bal)
                                }
                            } else {
                                (id, bal)
                            }
                        }
                    );
                    
                    // Add to farmer
                    state.inputTokenBalances := Array.append(state.inputTokenBalances, [(farmer, amount)]);
                    true
                } else { false }
            };
            case null { false }
        }
    };
};