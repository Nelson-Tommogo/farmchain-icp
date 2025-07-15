import Types "../core/types";
import Storage "../core/storage";
import Constants "../core/constants";
import Time "mo:base/Time";
import Array "mo:base/Array";

shared actor class DAO() = this {
    let state = Storage.init();

    // Create a new proposal
    public shared ({ caller }) func createProposal(title: Text, description: Text) : async Types.Proposal {
        let newProposal : Types.Proposal = {
            id = state.nextProposalId;
            creator = caller;
            title;
            description;
            votesFor = 0;
            votesAgainst = 0;
            voters = [];
            executed = false;
            created = Time.now();
        };
        state.proposals := Array.append(state.proposals, [newProposal]);
        state.nextProposalId += 1;
        newProposal
    };

    // Vote on a proposal
    public shared ({ caller }) func vote(proposalId: Nat, support: Bool) : async Bool {
        switch (Array.find(state.proposals, func (p: Types.Proposal) : Bool = p.id == proposalId)) {
            case (?proposal) {
                if (Array.find(proposal.voters, func (v: Principal) : Bool = v == caller) == null) {
                    let updatedProposal = if (support) {
                        { proposal with 
                            votesFor = proposal.votesFor + 1;
                            voters = Array.append(proposal.voters, [caller]);
                        }
                    } else {
                        { proposal with 
                            votesAgainst = proposal.votesAgainst + 1;
                            voters = Array.append(proposal.voters, [caller]);
                        }
                    };
                    
                    state.proposals := Array.map(state.proposals, 
                        func (p: Types.Proposal) : Types.Proposal = 
                            if (p.id == proposalId) updatedProposal else p);
                    true
                } else { false } // Already voted
            };
            case null { false } // Proposal not found
        }
    };

    // Execute a proposal
    public shared ({ caller }) func executeProposal(proposalId: Nat) : async Bool {
        switch (Array.find(state.proposals, func (p: Types.Proposal) : Bool = p.id == proposalId)) {
            case (?proposal) {
                if (not proposal.executed and proposal.votesFor > proposal.votesAgainst) {
                    // Execute proposal logic would go here
                    let updatedProposal = { proposal with executed = true };
                    state.proposals := Array.map(state.proposals, 
                        func (p: Types.Proposal) : Types.Proposal = 
                            if (p.id == proposalId) updatedProposal else p);
                    true
                } else { false }
            };
            case null { false }
        }
    };
};