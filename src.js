// translating FoldHashing python module to JS

foldNumber = (num, foldLength) => {
    /*
        this function will take a given number, fold it based on foldLength, and return a total,
    which can then be used to has a number. 
    For instance, foldNumber(1246245, 2), would fold our num to 12, 46, 24, 5, and then return 
    a sum of those individual folds. 
    We then use modular division between that total and a prime (total%prime) to hash our original number

    Args:
        num (int): number for which we want to create a hash
        foldLength (int): length of subportions of num that we want to add together.
            for example, foldLength=4 means that num=1356081717 breaks down to 1356, 0817, 17, and then summed

    Returns:
        total (int): total that can then be used, along with a prime and modular division, to hash original number
    */
   let stringNum = num.toString();
   let done = false;
   let strNums = [];
   while (stringNum && !done) {
       sNum = (
           stringNum.length > foldLength 
           ? stringNum.slice(0, foldLength) 
           : stringNum);
           strNums.push(parseInt(sNum));
           if (foldLength > stringNum.length) {
               done = true;
           };
           stringNum = stringNum.slice(foldLength,);
   }
   total = strNums.reduce((a,b) => a+b);
   return total;
}

// testing
console.log('testing foldNumber'); // everything is functioning properly 
let fn = foldNumber(3034317520, 2)
console.log(fn)
fn = foldNumber(3034317520, 3)
console.log(fn)
fn = foldNumber(3034317520, 15)
console.log(fn)

foldHash = (prime, arr, foldLength) => {
    /*
        Will take a list of integers and create a hashtable based on a folding hashing algorithm, 
    using the specified foldLength

    A hashlist (hl) is first created with prime number of None entries
    Then, for each item in l, a hash is created using the algorithm:
    hash = foldNumber(item)%prime, and then entries are entered into our hashtable using:
    hl[hash] = item

    Note that numbers in l do not have to be of the same length/magnitude

    Args:
        prime (int): prime number to be used in hashing
        l (list): list of integers that we wish to hash
        foldLength (int): length of subportions of num that we want to add together.
            for example, foldLength=4 means that num=1356081717 breaks down to 1356, 0817, 17, and then added


    Returns:
        hl (list): list of hashed integers. this is our hashtable
    */
   let hl = Array(prime).fill(null);
   let totals = arr.map(item => foldNumber(item, foldLength));
   let zipped = totals.map((tot, i) => [tot, arr[i]]);
   for (let [tot, orig] of zipped) {
       hl[tot%prime] = orig;
   }
   return hl;
}

// testing
console.log('testing foldHash'); // functioning properly
let nums = [1234567890, 343434343434, 55555555555, 901290129012];
console.log(nums);
let fh = foldHash(11, nums, 3);
console.log(fh);

