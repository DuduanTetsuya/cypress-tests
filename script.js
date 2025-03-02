class Latihan{
  //Buatlah sebuah fungsi yang dapat menghitung jumlah kata dalam sebuah kalimat.
  // Contoh: Jika kalimat yang diberikan adalah “Halo, nama saya John Doe”, maka hasilnya adalah 5.
  wordCounter(str){
    let count = 0;
    let sent = str.trim();
    const wordcount = sent.split(/\s+/).length;
    return `Word count of "${str}" is "${wordcount}"`;
  }

  //Buatlah sebuah fungsi yang dapat menemukan angka terbesar dari sebuah array.
  // Contoh: Jika array yang diberikan adalah [1, 5, 3, 7, 2], maka hasilnya adalah 7.
  highestNumber(arr){
    let highest = 0;
    for (let i=0; i<arr.length; i++){
      if(arr[i] > highest){
        highest = arr[i];
      }
    }
    return `The highest number of ${arr} is ${highest}`;
  }

  //Buatlah sebuah fungsi untuk mengurutkan angka dalam sebuah array dari yang terkecil ke yang terbesar.
  // Contoh: Jika array yang diberikan adalah [3, 1, 5, 2, 4], maka hasilnya adalah [1, 2, 3, 4, 5]
  sortLowHigh(arr){
    const sorter = arr.sort((a,b) => a-b);
    return `Sort Low to High of ${arr} is ${sorter}`;
  }

  //Buatlah sebuah fungsi yang dapat menentukan apakah sebuah kata atau kalimat adalah palindrom atau tidak.
  // Palindrom adalah kata atau kalimat yang dapat dibaca sama dari depan maupun dari belakang.
  // Contoh: Jika kata yang diberikan adalah “level”, maka hasilnya adalah “palindrom”.
  palindromCheck(str){
    const arr = str.split('').reverse();
    const reversed = arr.join('');
    let result = '';
    if (str === reversed){
      result = 'Palindrom';
    }else{
      result = "Not palindrom";
    }
    return `The word ${str} is ${result}`
  }
}

const testLatihan = new Latihan();
console.log(testLatihan.wordCounter('HWAEUAWDKA DIkadpawdawkr awrkawkr2oasdkaosd'));
console.log(testLatihan.highestNumber([1,3,4,5,6,8,3,3,1,1,2,3,6,7,22]));
console.log(testLatihan.sortLowHigh([1,3,4,5,6,8,3,3,1,1,2,3,6,7,22]));
console.log(testLatihan.palindromCheck('level'));