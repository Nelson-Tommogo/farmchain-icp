import Types "../core/types";
import Storage "../core/storage";
import Utils "../core/utils";
import Array "mo:base/Array";

shared actor class OutputToken() = this {
    let state = Storage.init();

    // Mint new output tokens (only callable by farmers)
    public shared ({ caller }) func mint(amount: Nat) : async Bool {
        assert amount > 0;
        assert Utils.isFarmer(state.farmers, caller);
        
        state.outputTokenBalances := Array.append(state.outputTokenBalances, [(caller, amount)]);
        true
    };

    // Burn output tokens
    public shared ({ caller }) func burn(amount: Nat) : async Bool {
        assert amount > 0;
        
        switch (Utils.find(state.outputTokenBalances, func ((id, _) : (Principal, Nat)) : Bool = id == caller)) {
            case (? (_, balance)) {
                if (balance >= amount) {
                    state.outputTokenBalances := Array.map<(Principal, Nat), (Principal, Nat)>(
                        state.outputTokenBalances,
                        func ((id, bal) : (Principal, Nat)) : (Principal, Nat) {
                            if (id == caller) (id, bal - amount) else (id, bal)
                        }
                    );
                    true
                } else { false }
            };
            case null { false }
        }
    };

    // Transfer output tokens
    public shared ({ caller }) func transfer(to: Principal, amount: Nat) : async Bool {
        assert amount > 0;
        
        switch (Utils.find(state.outputTokenBalances, func ((id, _) : (Principal, Nat)) : Bool = id == caller)) {
            case (? (_, balance)) {
                if (balance >= amount) {
                    // Deduct from sender
                    state.outputTokenBalances := Array.map<(Principal, Nat), (Principal, Nat)>(
                        state.outputTokenBalances,
                        func ((id, bal) : (Principal, Nat)) : (Principal, Nat) {
                            if (id == caller) (id, bal - amount) else (id, bal)
                        }
                    );

                    // Add to recipient
                    state.outputTokenBalances := Array.append(state.outputTokenBalances, [(to, amount)]);
                    true
                } else { false }
            };
            case null { false }
        }
    };
};