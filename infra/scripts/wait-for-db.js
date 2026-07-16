const {exec} = require("node:child_process")

function checkdb (){
    exec("docker exec postgres-dev pg_isready --host localhost" , handlereturn)
    function handlereturn (error, stdout) {
       let tacerto = stdout.search("accepting connections")
        if(tacerto !== -1){
            console.log("\n\n🟢 postgres aceitando conexões!!\n\n")
            return
    }
    else{
        process.stdout.write(".")
        checkdb()
    }

}}
console.log("📍aguardando postgres")
checkdb()
