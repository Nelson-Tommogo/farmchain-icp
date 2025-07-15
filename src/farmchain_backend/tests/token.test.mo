import Token "../src/FarmChain/token/token";
import Principal "mo:base/Principal";

actor {
    let token = await Token.Token();
    let testPrincipal = Principal.fromText("2vxsx-fae"); // Anonymous principal

    public func testTokenInitialization() : async Bool {
        // Initialize some tokens for testing
        await token.initializeInputTokens(testPrincipal, 1000);
        true
    };

    public func testTokenRedemption() : async Bool {
        let result = await token.redeemInputTokens(testPrincipal, 100);
        result
    };

    public func testOutputTokenMinting() : async Bool {
        let result = await token.mintOutputTokens(200);
        result
    };

    public func testTokenTransfer() : async Bool {
        let recipient = Principal.fromText("aaaaa-aa");
        let result = await token.transferOutputTokens(recipient, 50);
        result
    };

    public func runAllTests() : async Text {
        let results = [
            ("testTokenInitialization", await testTokenInitialization()),
            ("testTokenRedemption", await testTokenRedemption()),
            ("testOutputTokenMinting", await testOutputTokenMinting()),
            ("testTokenTransfer", await testTokenTransfer())
        ];
        
        var output = "Token Test Results:\n";
        for ((name, result) in results.vals()) {
            output #= name # ": " # (if result "PASSED" else "FAILED") # "\n";
        };
        output
    };
};