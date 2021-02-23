import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Modal, Descriptions } from "antd";

const ListMovies = ({ movies }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [omdbId, setOmdbId] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (omdbId) {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${omdbId}`
        );
        const data = await response.json();
        console.log("data", data);
        setCurrentMovie(data);
      }
    };

    getData();
  }, [omdbId]);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleViewMore = (movieId) => {
    console.log("movieId", movieId);
    setOmdbId(movieId);
    setIsModalVisible(true);
  };

  return (
    <>
      <Row style={{ margin: "0 10%" }}>
        {movies.map((movie) => (
          <Col span={8}>
            <Card
              style={{ width: 300 }}
              cover={<img alt="Not Found Image" src={movie.Poster} />}
              actions={[
                <Button
                  type="link"
                  onClick={() => handleViewMore(movie.imdbID)}
                >
                  Ver más
                </Button>,
              ]}
            >
              <Card.Meta title={movie.Title} description={movie.Year} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Detalles de la película"
        visible={isModalVisible}
        footer={[
          <Button key="close" type="primary" onClick={handleClose}>
            Cerrar
          </Button>,
        ]}
      >
        {currentMovie && (
          <Descriptions bordered>
            <Descriptions.Item label="Título">
              {currentMovie.Title}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};
export default ListMovies;
