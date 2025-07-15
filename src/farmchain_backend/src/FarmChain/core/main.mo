import Auth "../auth/auth";
import Token "../token/token";
import DAO "../dao/dao";
import Insurance "../insurance/insurance";
import Types "./types";
import Error "mo:base/Error";

shared actor class FarmChain() = this {
    var auth : ?Auth.Auth = null;
    var token : ?Token.Token = null;
    var dao : ?DAO.DAO = null;
    var insurance : ?Insurance.Insurance = null;

    public func init() : async () {
        auth := ?(await Auth.Auth());
        token := ?(await Token.Token());
        dao := ?(await DAO.DAO());
        insurance := ?(await Insurance.Insurance());
    };

    // Farmer registration
    public shared ({ caller }) func registerFarmer(name: Text, location: Text, farmSize: Float) : async Types.FarmerProfile {
        switch (auth) {
            case (?a) { await a.registerFarmer(name, location, farmSize) };
            case null { throw Error.reject("Auth not initialized") };
        }
    };

    // Agent registration
    public shared ({ caller }) func registerAgent(name: Text, location: Text) : async Types.AgentProfile {
        switch (auth) {
            case (?a) { await a.registerAgent(name, location) };
            case null { throw Error.reject("Auth not initialized") };
        }
    };

    // Token operations
    public shared ({ caller }) func redeemInputTokens(agent: Principal, amount: Nat) : async Bool {
        switch (token) {
            case (?t) { await t.redeemInputTokens(agent, amount) };
            case null { throw Error.reject("Token not initialized") };
        }
    };

    public shared ({ caller }) func mintOutputTokens(amount: Nat) : async Bool {
        switch (token) {
            case (?t) { await t.mintOutputTokens(amount) };
            case null { throw Error.reject("Token not initialized") };
        }
    };

    // DAO operations
    public shared ({ caller }) func createProposal(title: Text, description: Text) : async Types.Proposal {
        switch (dao) {
            case (?d) { await d.createProposal(title, description) };
            case null { throw Error.reject("DAO not initialized") };
        }
    };

    // Insurance operations
    public shared ({ caller }) func applyInsurance(cropType: Text, coverageAmount: Nat) : async Types.InsuranceApplication {
        switch (insurance) {
            case (?i) { await i.applyInsurance(cropType, coverageAmount) };
            case null { throw Error.reject("Insurance not initialized") };
        }
    };
};