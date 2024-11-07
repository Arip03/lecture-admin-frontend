<template>
  <div>
    <div
      @click="triggerFileInput"
      class="custom-upload-button"
      @dragover.prevent
      @drop="handleFileDrop"
    >
      <i class="bi bi-folder-fill"></i>
      <span class="upload-text">Click or Drag Files Here</span>
    </div>

    <!-- Display selected file name below the folder icon -->
    <div v-if="selectedFileName" class="selected-file-name">
      <p>Selected file: {{ selectedFileName }}</p>
    </div>

    <!-- Hidden File Input -->
    <input type="file" ref="fileInput" @change="handleFileUpload" accept="audio/mp3" style="display: none;" />

    <!-- Add button to confirm adding the lecture -->
    <button @click="addNewLecture" class="add-lecture-button">Add Lecture</button>

    <div v-if="lectures.length">
      <h2 class="lectures-title">Lectures List:</h2>
      <ul class="lectures-list">
        <li v-for="(lecture, index) in lectures" :key="index" class="lecture-item">
          <div class="lecture-title">{{ lecture.title }}</div>
          <div class="buttons-container">
            <button @click="playAudio(lecture)" class="play-button">
              <i class="fas fa-play"></i>
            </button>
            <button @click="stopAudio" class="stop-button">
              <i class="fas fa-stop"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audio: null,
      lectureFile: null,
      newLectureTitle: "",
      lectures: [],
      selectedFileName: "", // Store the name of the selected file
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.lectureFile = URL.createObjectURL(file); // Create a URL for the uploaded file
        this.selectedFileName = file.name; // Set the selected file name

        // Set the lecture title to the name of the uploaded file (without the extension)
        const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove the file extension
        this.newLectureTitle = fileName; // Set file name as lecture title
        console.log("Uploaded file URL:", this.lectureFile);
        console.log("Lecture title:", this.newLectureTitle);
      }
    },

    addNewLecture() {
      if (this.newLectureTitle && this.lectureFile) {
        const newLecture = {
          title: this.newLectureTitle,
          audioUrl: this.lectureFile,
        };
        this.lectures.push(newLecture);
        this.newLectureTitle = ""; // Reset after adding
        this.lectureFile = null;   // Reset after adding
        this.selectedFileName = ""; // Reset selected file name after adding lecture
      } else {
        alert("Please upload a lecture file.");
      }
    },

    playAudio(lecture) {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.audio = new Audio(lecture.audioUrl);
      this.audio.play();
    },

    stopAudio() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    },
  },
};
</script>

<style scoped>
.custom-upload-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  background: linear-gradient(145deg, #ff9e2a, #fcd19c);
  border-radius: 50px;
  padding: 30px 50px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.5);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  width: 250px;
  margin: 20px auto;
}

.custom-upload-button i {
  font-size: 40px;
  color: #fff;
}

.custom-upload-button .upload-text {
  margin-top: 10px;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}

.custom-upload-button:hover {
  transform: scale(1.05);
  background: linear-gradient(145deg, #fcd19c, #ff9e2a);
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.6);
}

.custom-upload-button:active {
  transform: scale(1);
}

input[type="file"] {
  display: none;
}

button {
  background-color: #ff9e2a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #fcd19c;
}

.selected-file-name {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.add-lecture-button {
  margin-top: 20px;
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.lectures-title {
  text-align: center;
  font-size: 22px;
  color: #333;
  margin-top: 30px;
  font-weight: bold;
}

.lectures-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.lecture-item {
  background: #f8f8f8;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lecture-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
}

.buttons-container {
  display: flex;
  gap: 10px;
}

.play-button, .stop-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.play-button:hover, .stop-button:hover {
  background-color: #45a049;
}

.stop-button {
  background-color: #f44336;
}

.stop-button:hover {
  background-color: #e53935;
}
</style>
