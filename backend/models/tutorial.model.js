module.exports = mongoose => {
    const Tutorial = mongoose.model(
      "tutorial",
      mongoose.Schema(
        {
          classroom: String,
          pavilion: String,
          dateForReq: String,
          hourForReq: String,
          requesitorId: String
        },
        { timestamps: true }
      )
    );
  
    return Tutorial;
  };