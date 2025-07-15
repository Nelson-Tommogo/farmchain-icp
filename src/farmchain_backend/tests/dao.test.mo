import DAO "../src/FarmChain/dao/dao";
import Types "../src/FarmChain/core/types";
import Principal "mo:base/Principal";

actor {
    let testPrincipal = Principal.fromText("2vxsx-fae"); // Anonymous principal

    public func getDAO() : async DAO.DAO {
        await DAO.DAO();
    };

    public func testCreateProposal() : async Bool {
        let dao = await getDAO();
    public func testVoteOnProposal() : async Bool {
        let dao = await getDAO();
        let proposal = await dao.createProposal("Voting Test", "Test voting");
        let voteResult = await dao.vote(proposal.id, true);
        let updatedProposal = await dao.getProposal(proposal.id);
        
        voteResult and switch (updatedProposal) {
            case (?p) { p.votesFor == 1 };
            case null { false };
        }
    };

    public func testExecuteProposal() : async Bool {
        let dao = await getDAO();
        let proposal = await dao.createProposal("Execution Test", "Test execution");
        ignore await dao.vote(proposal.id, true);
        let executeResult = await dao.executeProposal(proposal.id);
        let executedProposal = await dao.getProposal(proposal.id);
        
        executeResult and switch (executedProposal) {
            case (?p) { p.executed };
            case null { false };
        }
    };
            case (?p) { p.executed };
            case null { false };
        }
    };

    public func runAllTests() : async Text {
        let results = [
            ("testCreateProposal", await testCreateProposal()),
            ("testVoteOnProposal", await testVoteOnProposal()),
            ("testExecuteProposal", await testExecuteProposal())
        ];
        
        var output = "DAO Test Results:\n";
        for ((name, result) in results.vals()) {
            output #= name # ": " # (if result "PASSED" else "FAILED") # "\n";
        };
        output
    };
};