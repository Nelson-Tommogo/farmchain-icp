import Token "../src/FarmChain/token/token";
import Principal "mo:base/Principal";

actor {
    var token : ?Token.Token = null;
    let testPrincipal = Principal.fromText("2vxsx-fae"); // Anonymous principal

    public func testTokenInitialization() : async Bool {
        // Initialize token if not already done
        if (token == null) {
            token := ?(await Token.Token());
        };
        // Initialize some tokens for testing
        switch (token) {
            case (?t) {
                await t.initializeInputTokens(testPrincipal, 1000);
                true
            };
            case null { false };
        }
    };

    public func testTokenRedemption() : async Bool {
        switch (token) {
            case (?t) {
                let result = await t.redeemInputTokens(testPrincipal, 100);
                result
            };
            case null { false };
        }
    };

    public func testOutputTokenMinting() : async Bool {
        switch (token) {
            case (?t) {
                let result = await t.mintOutputTokens(200);
                result
            };
            case null { false };
        }
    };

    public func testTokenTransfer() : async Bool {
        let recipient = Principal.fromText("aaaaa-aa");
        switch (token) {
            case (?t) {
                let result = await t.transferOutputTokens(recipient, 50);
                result
            };
            case null { false };
        }
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