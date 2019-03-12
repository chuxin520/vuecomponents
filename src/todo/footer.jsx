import '../styles/footer.css'
//styl  文件要拆分出去
export default {
    data(){
        return{
            author: 'xuxian'
        }
    },
    render(){
        return (
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}