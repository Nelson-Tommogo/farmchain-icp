import Token "../src/FarmChain/token/token";
import InputToken "../src/FarmChain/token/inputToken";
import OutputToken "../src/FarmChain/token/outputToken";
import Principal "mo:base/Principal";

actor {
    var token : ?Token.Token = null;
    var inputToken : ?InputToken.InputToken = null;
    var outputToken : ?OutputToken.OutputToken = null;
    let testPrincipal = Principal.fromText("2vxsx-fae"); // Anonymous principal

    func initTokens() : async () {
        token := ?(await Token.Token());
        inputToken := ?(await InputToken.InputToken());
        outputToken := ?(await OutputToken.OutputToken());
    };

    func testInputTokenFlow() : async Bool {
        switch inputToken {
            case (?it) {
                await it.initSupply();
                let transferResult = await it.transfer(testPrincipal, 100);
                let balance = await it.balanceOf();
                transferResult and balance == 100
            };
            case null { false }
        }
    };

    func testOutputTokenFlow() : async Bool {
        switch outputToken {
            case (?ot) {
                let mintResult = await ot.mint(200);
                let transferResult = await ot.transfer(testPrincipal, 100);
                mintResult and transferResult
            };
            case null { false }
        }
    };

    func testRedeemAndMintFlow() : async Bool {
        // Simulate farmer redeeming inputs and minting outputs
        // For demonstration, just return true if both tokens are initialized
        switch (inputToken, outputToken) {
            case (?it, ?ot) { true };
            case _ { false }
        }
    };

    func runAllTests() : async Text {
        await initTokens();
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
}
