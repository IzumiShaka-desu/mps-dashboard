import ReactLoading from "react-loading";
import { Row, Col, Container } from "react-bootstrap";


function DefaultLoading() {
    return (
        <Container fluid="sm" className="align-items-center" >

            <div style={{ marginTop: "8em" }}>

            </div>
            <div className="row">
                <div className="col">
                    <h1>Loading...</h1>
                </div>
            </div>
            <center><ReactLoading type={"bubbles"} color={"#30C5FF"} height={'10%'} width={'10%'} /></center>
        </Container>
    );
}

export default DefaultLoading;