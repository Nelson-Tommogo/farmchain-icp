import Types "../core/types";
import Storage "../core/storage";

module {
    // Helper function to find an item in an array
    public func find<T>(array: [T], predicate: (T) -> Bool) : ?T {
        for (item in array.vals()) {
            if (predicate(item)) {
                return ?item;
            }
        };
        null
    };

    // Helper function to update an item in an array
    public func update<T>(array: [var T], index: Nat, updateFn: (T) -> T) : [var T] {
        array[index] := updateFn(array[index]);
        array
    };

    // Calculate voting power based on token holdings
    public func calculateVotingPower(balances: [(Principal, Nat)], voter: Principal) : Nat {
        switch (find(balances, func (entry : (Principal, Nat)) : Bool { entry.0 == voter })) {
            case (? (_, balance)) { balance };
            case null { 0 };
        }
    };

    // Verify if a principal is a registered farmer
    public func isFarmer(farmers: [(Principal, Types.FarmerProfile)], principal: Principal) : Bool {
        find(farmers, func ((id, _) : (Principal, Types.FarmerProfile)) : Bool { id == principal }) != null
    };

    // Verify if a principal is a registered agent
    public func isAgent(agents: [(Principal, Types.AgentProfile)], principal: Principal) : Bool {
        find(agents, func ((id, _) : (Principal, Types.AgentProfile)) : Bool { id == principal }) != null
    };
};