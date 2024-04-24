const express = require('express')

const app = express();
const PORT = 5000;

app.use(express.json());

let songArray = [
    { 
        id: "1",
        title: "Mal Mitak",
        artist: "Kasun Kalhara"
    },
    { 
        id: "2",
        title: "Vikasitha Pem",
        artist: "WD Amaradewa"
    }
];

app.get("/", (req, res) => {
    res.status(200).json({ message: "Songs read successfully", data: songArray });
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    const song = songArray.find(item => item.id === id);
    if (!song) {
        return res.status(404).json({ message: "Song not found!" });
    }
    res.status(200).json({ message: "Song read successfully", data: song });
});

app.post("/", (req, res) => {
    const { id, title, artist } = req.body;
    const existingSong = songArray.find(item => item.id === id);
    if (existingSong) {
        return res.status(400).json({ message: "Song with this ID already exists!" });
    }
    const newSong = { id, title, artist };
    songArray.push(newSong);
    res.status(201).json({ message: "Song created successfully", data: newSong });
});

app.patch("/:id", (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const songIndex = songArray.findIndex(item => item.id === id);
    if (songIndex === -1) {
        return res.status(404).json({ message: "Song not found!" });
    }
    songArray[songIndex] = { ...songArray[songIndex], ...newData };
    res.status(200).json({ message: "Song updated successfully", data: songArray[songIndex] });
});

app.delete("/:id", (req, res) => {
    const id = req.params.id;
    const songIndex = songArray.findIndex(item => item.id === id);
    if (songIndex === -1) {
        return res.status(404).json({ message: "Song not found!" });
    }
    songArray.splice(songIndex, 1);
    res.status(200).json({ message: "Song removed successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
});
