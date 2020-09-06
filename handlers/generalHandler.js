// Shuffle
module.exports.shuffle = (array) => {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
};

// Get Random Int
module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

// Sleep
module.exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// RandomSleep
module.exports.randomSleep = async (min, max) => {
  return await this.sleep(this.getRandomInt(min, max) * 1000);
};
