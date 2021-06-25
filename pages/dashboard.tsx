import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { setAPIClient } from "../services/api"
import { api } from "../services/setAPIClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {

    const { user, signOut } = useContext(AuthContext)

    useEffect(() => {

        api.get('/me').then(response => {
            console.log(response)
        }).catch(err => console.log(err))

    }, [])

    return (
        <div>
            dashboard: {user?.email}
            <div>
                <button onClick={() => signOut()}>Sair</button>
            </div>
            <Can permissions={['metrics.list']} >
                <div>Métricas</div>
            </Can>
        </div>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setAPIClient(ctx)
    const response = await apiClient.get('/me')
    return {
        props: {}
    }
})