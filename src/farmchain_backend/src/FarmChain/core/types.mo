module {
    public type FarmerId = Principal;
    public type AgentId = Principal;
    public type InvestorId = Principal;
    public type TokenId = Nat;
    public type ProposalId = Nat;
    public type InsuranceId = Nat;
    public type FinanceId = Nat;

    public type FarmerProfile = {
        id: FarmerId;
        name: Text;
        location: Text;
        farmSize: Float;
        verified: Bool;
        joined: Int;
    };

    public type AgentProfile = {
        id: AgentId;
        name: Text;
        location: Text;
        verified: Bool;
        inputTokenBalance: Nat;
    };

    public type InsuranceApplication = {
        id: InsuranceId;
        farmerId: FarmerId;
        cropType: Text;
        coverageAmount: Nat;
        status: { #pending; #approved; #rejected };
        appliedDate: Int;
    };

    public type FinanceApplication = {
        id: FinanceId;
        farmerId: FarmerId;
        amount: Nat;
        purpose: Text;
        status: { #pending; #voting; #approved; #rejected };
        votesFor: Nat;
        votesAgainst: Nat;
        voters: [InvestorId];
    };

    public type Proposal = {
        id: ProposalId;
        creator: Principal;
        title: Text;
        description: Text;
        votesFor: Nat;
        votesAgainst: Nat;
        voters: [Principal];
        executed: Bool;
        created: Int;
    };

    public type TokenMetadata = {
        id: TokenId;
        name: Text;
        symbol: Text;
        decimals: Nat;
        totalSupply: Nat;
        creator: Principal;
    };
};