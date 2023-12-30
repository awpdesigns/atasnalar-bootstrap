const source = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, mi in ultrices tincidunt, nisl libero gravida sem, imperdiet gravida justo turpis vel mi. Morbi consequat gravida ligula, ut lacinia tortor dignissim vel. Nunc quis hendrerit dolor. Pellentesque elit enim, lacinia at tellus eget, lacinia dapibus neque. Pellentesque vitae urna nisi. Aenean a hendrerit augue. Maecenas tellus sem, laoreet id auctor non, vulputate quis sem. Aenean sagittis condimentum arcu non volutpat. Maecenas consequat ante eu quam viverra, et venenatis dui posuere. Quisque et cursus quam. In cursus ante vitae erat blandit, a aliquet risus mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed venenatis feugiat fringilla. Proin et hendrerit dui. Sed aliquam finibus sodales. Etiam at risus sit amet nunc rhoncus maximus. Fusce faucibus luctus leo tincidunt lobortis. Nulla facilisis, nisi sed tincidunt maximus, turpis ligula dignissim lorem, at lacinia metus orci non erat. Fusce in purus porta nulla tristique faucibus pharetra ut diam. Praesent non facilisis libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam tristique non erat et blandit. Praesent aliquet eleifend erat imperdiet tristique. Praesent ac lectus enim. Aliquam erat volutpat. Quisque vulputate mauris id sapien posuere accumsan. Quisque sit amet ligula nec lectus auctor finibus. Aliquam mi felis, faucibus at efficitur et, vestibulum quis ipsum. Nam sem nunc, posuere ac turpis eget, consectetur blandit arcu. Nulla euismod arcu arcu, non ullamcorper felis consectetur vel. Sed consequat lorem in mi mattis, quis volutpat leo congue. Nulla sodales quam sed lobortis dapibus. Nunc lobortis eros ac diam porta, quis auctor justo ornare. Nam tempor lectus erat, quis condimentum nunc iaculis sit amet. Nam quis dolor felis. Nunc pulvinar, nisi sit amet consectetur ullamcorper, ante urna fermentum mi, posuere pharetra quam diam eget lectus. Maecenas nec elementum leo, non ultricies orci. Nulla sem purus, commodo eu sem sit amet, bibendum feugiat ligula. Cras faucibus enim a mi dignissim, non dignissim lacus vehicula.";
const words = source.split(" ");
let sentences = indexes(words);

sentences.unshift(words[0]);
sentences.pop();

function indexes(source) {
    let output = [];

    for (let i = 0; i < source.length; i++) {
        if (source[i].indexOf(".") !== -1) {
            output.push(source[i + 1]);
        }
    }

    return output;
}

function lorem(wordcount) {
    let random = Math.floor(Math.random() * sentences.length);
    let max = words.length - wordcount;

    if (random > max) {
        lorem(wordcount);
    }

    let start = sentences[random];
    let pos = words.indexOf(start);
    let output = [];

    for (let i = pos; i < pos + wordcount; i++) {
        output.push(words[i]);
    }

    document.write(output.join(" "));
}