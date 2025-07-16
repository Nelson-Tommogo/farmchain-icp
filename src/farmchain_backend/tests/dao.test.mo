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
        let proposal = await dao.createProposal("Create Proposal Test", "Test creation");
        proposal.title == "Create Proposal Test" and proposal.description == "Test creation"
    };

    public func testVoteOnProposal() : async Bool {
        let dao = await getDAO();
        let proposal = await dao.createProposal("Voting Test", "Test voting");
        let voteResult = await dao.vote(proposal.id, true);
        // Since getProposal does not exist, we cannot fetch the updated proposal.
        // Instead, just return the result of the vote.
        voteResult
    };

    public func testExecuteProposal() : async Bool {
        let dao = await getDAO();
        let proposal = await dao.createProposal("Execution Test", "Test execution");
        ignore await dao.vote(proposal.id, true);
        let executeResult = await dao.executeProposal(proposal.id);
        let proposal2 = await dao.createProposal("Execution Test", "Test execution");
        ignore await dao.vote(proposal2.id, true);
        let executeResult2 = await dao.executeProposal(proposal2.id);
        // Since getProposal does not exist, we cannot fetch the executed proposal.
        // Instead, just return the result of the execution.
        let results = [
            ("testCreateProposal", await testCreateProposal()),
            ("testVoteOnProposal", await testVoteOnProposal()),
            ("testExecuteProposal", executeResult)
        ];
        
        // Return true if all tests passed, false otherwise
        var allPassed = true;
        for ((_, result) in results.vals()) {
            if (result == false) {
                allPassed := false;
            };
        };
        allPassed
    };
};