declare module "@ruffle-rs/ruffle" {
  export const RufflePlayer: {
    newest: () => {
      createPlayer: () => unknown;
    };
  };
}
