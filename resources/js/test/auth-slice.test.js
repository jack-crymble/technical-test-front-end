import authSlice, { login, logout } from "../store/features/auth-slice";

describe("AuthSlice", () => {
    describe("Initial State", () => {
        it("should set initial state", () => {
            expect(authSlice(undefined, { type: undefined })).toEqual(
                expect.objectContaining({
                    authenticated: false,
                    user: null,
                })
            );
        });
    });

    describe("Reducers", () => {
        describe("login", () => {
            const initialState = {
                authenticated: false,
                user: null,
            };

            it("should update state", () => {
                const expected = {
                    authenticated: true,
                    user: "Nicolas Cage",
                };
                const actual = authSlice(
                    initialState,
                    login({ user: expected.user })
                );

                expect(actual).toStrictEqual(expect.objectContaining(expected));
            });
        });

        describe("logout", () => {
            const initialState = {
                authenticated: true,
                user: "Nicolas Cage",
            };

            it("should update state", () => {
                const expected = {
                    authenticated: false,
                    user: null,
                };
                const actual = authSlice(initialState, logout());

                expect(actual).toStrictEqual(expect.objectContaining(expected));
            });
        });
    });
});
