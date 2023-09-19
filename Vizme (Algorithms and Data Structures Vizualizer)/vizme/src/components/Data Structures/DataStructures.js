import React from "react";

function DataStructures() {
    return (
        <div className="dataStructures">
            <iframe width="800px" height="200px" src="https://godbolt.org/e#g:!((g:!((g:!((h:codeEditor,i:(filename:'1',fontScale:14,fontUsePx:'0',j:1,lang:csharp,selection:(endColumn:28,endLineNumber:15,positionColumn:28,positionLineNumber:15,selectionStartColumn:28,selectionStartLineNumber:15,startColumn:28,startLineNumber:15),source:'using+System%3B%0A%0Aclass+Program%0A%7B%0A++++static+int+Square(int+num)+%3D%3E+num+*+num%3B%0A++++static+void+Main()+%3D%3E+Console.WriteLine(Square(42))%3B%0A%7D%0Aclass+Car+%7B%0A++++public+string+make+%7Bget%3B+set%3B%7D%0A++++public+string+model+%7Bget%3B+set%3B%7D%0A++++public+int+cost+%7Bget%3B+set%3B%7D%0A%0A++++Car(string+make,+string+model,+int+cost)+%7B%0A++++++++this.make+%3D+make%3B+%0A++++++++this.model+%3D+model%3B%0A++++++++this.cost+%3D+cost%3B%0A++++%7D%0A%7D%0A'),l:'5',n:'0',o:'C%23+source+%231',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:dotnet707csharp,deviceViewOpen:'1',filters:(b:'0',binary:'1',binaryObject:'1',commentOnly:'0',debugCalls:'1',demangle:'0',directives:'0',execute:'1',intel:'0',libraryCode:'0',trim:'1'),flagsViewOpen:'1',fontScale:14,fontUsePx:'0',j:1,lang:csharp,libs:!(),options:'',overrides:!(),selection:(endColumn:1,endLineNumber:1,positionColumn:1,positionLineNumber:1,selectionStartColumn:1,selectionStartLineNumber:1,startColumn:1,startLineNumber:1),source:1),l:'5',n:'0',o:'+.NET+7.0.105+(Editor+%231)',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0')),l:'2',n:'0',o:'',t:'0')),version:4"></iframe>
        </div>
    );
}

export default DataStructures;