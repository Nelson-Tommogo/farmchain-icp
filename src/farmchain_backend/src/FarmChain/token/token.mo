import Types "../core/types";
import Storage "../core/storage";
import Constants "../core/constants";
import Array "mo:base/Array";

shared actor class Token() = this {
    let state = Storage.init();

    // Initialize input tokens for agents
    public shared func initializeInputTokens(agent: Principal, amount: Nat) : async () {
        assert amount > 0;
        state.inputTokenBalances := Array.append(state.inputTokenBalances, [(agent, amount)]);
    };

    // Farmer redeems input tokens from agent
    public shared ({ caller }) func redeemInputTokens(agent: Principal, amount: Nat) : async Bool {
        assert amount > 0;
        switch (Array.find(state.inputTokenBalances, func ((id, _) : (Principal, Nat)) : Bool = id == agent)) {
            case (? (_, balance)) {
                if (balance >= amount) {
                    // Deduct from agent
                    state.inputTokenBalances := Array.map<(Principal, Nat), (Principal, Nat)>(
                        state.inputTokenBalances, 
                        func ((id, bal) : (Principal, Nat)) : (Principal, Nat) {
                            if (id == agent) (id, bal - amount) else (id, bal)
                        }
                    );
                    
                    // Add to farmer
                    state.inputTokenBalances := Array.append(state.inputTokenBalances, [(caller, amount)]);
                    true;
                } else { false }
            };
            case null { false };
        }
    };

    // Farmer mints output tokens
    public shared ({ caller }) func mintOutputTokens(amount: Nat) : async Bool {
        assert amount > 0;
        state.outputTokenBalances := Array.append(state.outputTokenBalances, [(caller, amount)]);
        true
    };

    // Transfer output tokens to agribusiness
    public shared ({ caller }) func transferOutputTokens(to: Principal, amount: Nat) : async Bool {
        assert amount > 0;
        switch (Array.find(state.outputTokenBalances, func ((id, _) : (Principal, Nat)) : Bool = id == caller)) {
            case (? (_, balance)) {
                if (balance >= amount) {
                    // Deduct from sender
                    state.outputTokenBalances := Array.map<(Principal, Nat), (Principal, Nat)>(
                        state.outputTokenBalances,
                        func ((id, bal) : (Principal, Nat)) : (Principal, Nat) {
                            if (id == caller) {
                                if (bal >= amount) (id, bal - amount) else (id, bal)
                            } else (id, bal)
                        }
                    );
                    
                    // Add to recipient
                    state.outputTokenBalances := Array.append(state.outputTokenBalances, [(to, amount)]);
                    true
                } else { false }
            };
            case null { false };
        }
    };
};