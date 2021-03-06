let { firstIt } = require("@art-suite/chained-test");
let { auth, createPost, createComment, getComments, logOut } = require("./TestApp");

const aliceEmail = "alice@test.com";
const postBody = "The quick brown fox jumped over the lazy dog.";
const commentBody = "Brilliant!";

describe("Alice's user story", function () {
  // The return-result of this first test will be passed as the
  // second argument to all subsequent tests in the chain.
  firstIt("needs to let her authenticate", () => auth(aliceEmail))

    // In "then" tests, the test's return value is passed to the next test.
    // skipped: if neither this nor any dependent tests are selected by test framework
    .thenIt("lets Alice create a post", () =>
      createPost(postBody)
    )

    // "tap" tests: ignores the test's return value. Instead it passes lastTestValue through.
    // skipped: if neither this nor any dependent tests are selected by test framework
    .tapIt("lets Alice create a comment", (post, alice) =>
      createComment(post.id, commentBody)
    )

    .thenIt("lets Alice get the comments for her post", (post, alice) =>
      getComments(post.id)
    )

    // In "softTap" tests, the test's return value is ignored.
    // Instead it passes lastTestValue through to the next test.
    // skipped: if not selected by test framework
    .softTapIt("should have only one comment by Alice", (comments, alice) => {
      expect(comments.length).toEqual(1);
      expect(comments[0].userId).toEqual(alice.id);
    })

    .tapIt("should let Alice logOut", logOut)
})