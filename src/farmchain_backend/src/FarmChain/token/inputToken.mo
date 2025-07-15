import Types "../core/types";
import Storage "../core/storage";
import Utils "../core/utils";
import Constants "../core/constants";
import Principal "mo:base/Principal";
import Array "mo:base/Array";

shared actor class InputToken() = this {
    let state = Storage.init();

    // Initialize the token supply (only callable once)
    private var initialized = false;
    
    public shared func initSupply() : async () {
        assert not initialized;
        initialized := true;
        state.inputTokenBalances := [(Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"), Constants.INITIAL_INPUT_TOKENS)];
    };

    // Transfer input tokens
    public shared ({ caller }) func transfer(to: Principal, amount: Nat) : async Bool {
        assert amount > 0;
        
        switch (Utils.find(state.inputTokenBalances, func ((id, _) : (Principal, Nat)) : Bool = id == caller)) {
            case (? (_, balance)) {
                if (balance >= amount) {
                    // Deduct from sender
                    state.inputTokenBalances := Array.map<(Principal, Nat), (Principal, Nat)>(
                        state.inputTokenBalances,
                        func((id, bal) : (Principal, Nat)) : (Principal, Nat) {
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
                    
                    // Add to recipient
                    state.inputTokenBalances := Array.append(state.inputTokenBalances, [(to, amount)]);
                    true
                } else { false }
            };
            case null { false }
        }
    };

    // Get balance of input tokens
    public shared query ({ caller }) func balanceOf() : async Nat {
        switch (Utils.find(state.inputTokenBalances, func ((id, _) : (Principal, Nat)) : Bool = id == caller)) {
            case (? (_, balance)) { balance };
            case null { 0 };
        }
    };
};