import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Backlog from "./pages/Backlog";
import TicketWizard from "./pages/TicketWizard";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/backlog" replace />} />
                <Route path="/backlog" element={<Backlog />} />
                <Route path="/ticket/:id" element={<TicketWizard />} />
                <Route path="/ticket/new" element={<TicketWizard />} />
                <Route path="*" element={<Navigate to="/backlog" replace />} />
            </Routes>
        </>
    );
}

export default App;
