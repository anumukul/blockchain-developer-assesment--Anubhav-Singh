# Full-Stack Blockchain Assessment

This is a project for blockchain developers. Candidates fix bugs and add missing code across **smart contract simulation**, **backend APIs**, and **frontend**.

## Assessment Details

- **Duration**: 4 hours from the time you receive invitation from GitHub.

- **Format**: Take-home project

- **Submission**: Upon completion, make a public repository, submit your deliverables with your name on GitHub and contact **gauge@crewspacex.com**

## Stack

- **Frontend**: TypeScript, Vite, React
- **Backend**: Node.js, CommonJS, Express
- **Contracts**: In-memory JS simulation (TokenVault-style contract)

## Run the project

From the repo root:

```bash
npm install
npm run dev
```

A single `npm run dev` starts both the backend and the frontend. Backend runs at `http://localhost:3001`, frontend at `http://localhost:5173` with API proxy to the backend.

## Assessment tasks (for candidates)

1. **Backend – Wallet API**  
   Fix the response so the frontend can display the wallet balance.

2. **Backend – Contract balance**  
   The TokenVault `balanceOf` result includes a non-JSON-serializable value. Return the contract balance in a JSON-safe format.

3. **Backend – Withdraw access control**  
   In `TokenVault.withdraw`, ensure only the contract owner can call withdraw. Return a clear error for unauthorized callers.

4. **Backend – Chain blocks**  
   `GET /api/chain/blocks?limit=N` should return the **latest** N blocks (e.g. last 5), not the first N. Fix the route logic.

5. **Backend – Error handling**  
   Add a global Express error handler that responds with `{ error: message }` and status 500 for unhandled errors.

6. **Frontend – Wallet display**  
   The wallet balance from the API may be a string or number. Ensure the Wallet section always displays the balance correctly (no `[object Object]` or serialization issues).

7. **Frontend – Chain section**  
   When fetching “latest blocks”, pass the `limit` (e.g. 5) to the API so the backend returns the correct slice. Use the existing `limit` variable in the component.

8. **Optional**  
   Add a simple loading or error state improvement, or a unit test for one contract function.


Candidates should fix the above so that:

- Backend stays running and all listed endpoints behave correctly.
- Frontend can check health, view wallet balance, view/use contract deposit/withdraw, and list latest blocks without errors.
