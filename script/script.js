var input = document.getElementById('input'),
    formatter = charFormatter(),
    sequence = sequenceFinder();

function addTextToDiv() {
    var collections,
        formattedText,
        unformattedText = input.value,
        indexInfo = indexesOfNumberAndNonNumberSymbols(unformattedText);

    collections = {
        boldCollection: sequence.repeatingNumberSequence(indexInfo.numberSymbolsIndexes, unformattedText),
        redCollection: sequence.oddNumberSequence(indexInfo.numberSymbolsIndexes, unformattedText),
        greyCollection: indexInfo.nonNumberSymbolsIndexes
    };

    formattedText = formatting(collections, unformattedText);

    return document.getElementById('output').innerHTML = formattedText;
}

function indexesOfNumberAndNonNumberSymbols(text) {
    var i,
        symbol,
        indexesOfNumberSymbols = [],
        indexesOfNonNumberSymbols = [];

    for (i in text) {
        symbol = text.charAt(i);
        isNaN(+symbol) ? indexesOfNonNumberSymbols.push(+i) : indexesOfNumberSymbols.push(+i);
    }

    return {
        nonNumberSymbolsIndexes: indexesOfNonNumberSymbols,
        numberSymbolsIndexes: indexesOfNumberSymbols
    };
}

function sequenceFinder() {
    var i,
        j,
        len,
        currentNumber,
        lastNumber,
        lastIndex,
        maxCounter,
        needNewSequenceStart,
        sequenceFinder = {
            repeatingNumberSequence: function(indexCollection, text) {
                var startIndexes = [],
                    sequencesCounters = [],
                    numbers = [],
                    result = [];

                for (i = 0, len = indexCollection.length; i < len; i += 1) {
                    numbers.push(+text.charAt(indexCollection[i]));
                }

                lastNumber = numbers[0];
                lastIndex = 0;
                startIndexes.push(indexCollection[0]);
                sequencesCounters.push(1);

                for (i = 1, len = numbers.length; i < len; i += 1) {
                    currentNumber = numbers[i];
                    if (currentNumber === lastNumber && indexCollection[lastIndex] === indexCollection[i] - 1) {
                        sequencesCounters[sequencesCounters.length - 1] += 1;
                    } else {
                        lastNumber = currentNumber;
                        startIndexes.push(indexCollection[i]);
                        sequencesCounters.push(1);
                    }

                    lastIndex += 1;
                }
                maxCounter = Math.max.apply(null, sequencesCounters);

                for (i = 0, len = sequencesCounters.length; i < len; i += 1) {
                    if (sequencesCounters[i] === maxCounter) {
                        for (j = 0; j < maxCounter; j++) {
                            result.push(startIndexes[i] + j)
                        }
                    }
                }

                return result;
            },
            oddNumberSequence: function(indexCollection, text) {
                var startIndexes = [],
                    sequencesCounters = [],
                    numbers = [],
                    result = [];

                for (i = 0, len = indexCollection.length; i < len; i += 1) {
                    numbers.push(+text.charAt(indexCollection[i]));
                }

                needNewSequenceStart = true;

                for (i = 0, len = numbers.length; i < len; i += 1) {
                    currentNumber = numbers[i];

                    if (currentNumber % 2 !== 0) {
                        if (!needNewSequenceStart && indexCollection[lastIndex] === indexCollection[i] - 1) {
                            sequencesCounters[sequencesCounters.length - 1] += 1;
                        } else {
                            startIndexes.push(indexCollection[i]);
                            sequencesCounters.push(1);
                            needNewSequenceStart = false;
                        }
                    } else {
                        needNewSequenceStart = true;
                    }

                    lastIndex = i;
                }

                maxCounter = Math.max.apply(null, sequencesCounters);

                for (i = 0, len = sequencesCounters.length; i < len; i += 1) {
                    if (sequencesCounters[i] === maxCounter) {
                        for (j = 0; j < maxCounter; j += 1) {
                            result.push(startIndexes[i] + j);
                        }
                    }
                }

                return result;
            }
        };

    return sequenceFinder;
}

function charFormatter() {
    var charFormatter = {
        boldChar: function(char) {
            return char.bold();
        },
        redChar: function(char) {
            return char.fontcolor('red');
        },
        greyChar: function(char) {
            return char.fontcolor('lightgrey')
        }
    };

    return charFormatter;
}

function formatting(collections, text) {
    var i,
        len,
        currentChar,
        result = '';

    for (i = 0, len = text.length; i < len; i += 1) {
        currentChar = text.charAt(i);

        if (collections.boldCollection.indexOf(i) >= 0) {
            currentChar = formatter.boldChar(currentChar);
        }
        if (collections.redCollection.indexOf(i) >= 0) {
            currentChar = formatter.redChar(currentChar);
        }
        if (collections.greyCollection.indexOf(i) >= 0) {
            currentChar = formatter.greyChar(currentChar);
        }

        result += currentChar;
    }
    return result;
}
