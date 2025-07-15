import Token "../src/FarmChain/token/token";
import InputToken "../src/FarmChain/token/inputToken";
import OutputToken "../src/FarmChain/token/outputToken";
import Principal "mo:base/Principal";

actor {
    let token = await Token.Token();
    let inputToken = await InputToken.InputToken();
    let outputToken = await OutputToken.OutputToken();
    let testPrincipal = Principal.fromText("2vxsx-fae"); // Anonymous principal

    public func testInputTokenFlow() : async Bool {
        // Initialize supply
        await inputToken.initSupply();
        
        // Transfer some tokens
        let transferResult = await inputToken.transfer(testPrincipal, 100);
        let balance = await inputToken.balanceOf();
        
        transferResult and balance == 100
    };

    public func testOutputTokenFlow() : async Bool {
        // Mint some tokens (would need farmer auth in real scenario)
        let mintResult = await outputToken.mint(200);
        let transferResult = await outputToken.transfer(testPrincipal, 100);
        let balance = await outputToken.balanceOf();
        
        mintResult and transferResult and balance == 100
    };

    public func testRedeemAndMintFlow() : async Bool {
        // Simulate farmer redeeming inputs and minting outputs
        let redeemResult = await token.redeemInputTokens(testPrincipal, 50);
        let mintResult = await token.mintOutputTokens(100);
        
        redeemResult and mintResult
    };

    public func runAllTests() : async Text {
        let results = [
            ("testInputTokenFlow", await testInputTokenFlow()),
            ("testOutputTokenFlow", await testOutputTokenFlow()),
            ("testRedeemAndMintFlow", await testRedeemAndMintFlow())
        ];
        
        var output = "Input/Output Flow Test Results:\n";
        for ((name, result) in results.vals()) {
            output #= name # ": " # (if result "PASSED" else "FAILED") # "\n";
        };
        output
    };
};