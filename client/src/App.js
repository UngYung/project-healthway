import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import NotFound from "./pages/NotFound";

const cache = new InMemoryCache({
  typePolicies: {
    query: {
      fields: {
        patients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        appointments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointments/:id" element={<Appointment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
